import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize, map } from 'rxjs';
import { ToastComponent, ToastMessage } from '../../shared/components/toast/toast.component';
import {
  ApiErrorBody,
  CampaignFormData,
  CampaignService,
  CampaignStatus,
} from './campaign.service';

type SampleChoice = 'sim' | 'nao';

type FieldName =
  | 'shopName'
  | 'shopCode'
  | 'rate'
  | 'months'
  | 'samples'
  | 'gmv'
  | 'postRate'
  | 'name'
  | 'email'
  | 'phone'
  | 'message'
  | 'consent';

const FIELD_NAMES: FieldName[] = [
  'shopName',
  'shopCode',
  'rate',
  'months',
  'samples',
  'gmv',
  'postRate',
  'name',
  'email',
  'phone',
  'message',
  'consent',
];

// Caminho do campo na resposta 400 da API → campo do formulário.
const API_FIELD_MAP: Record<string, FieldName> = {
  brandName: 'shopName',
  shopCode: 'shopCode',
  commissionRate: 'rate',
  months: 'months',
  offersSamples: 'samples',
  sampleMinGmvMinor: 'gmv',
  sampleMinPostRate: 'postRate',
  contactName: 'name',
  contactEmail: 'email',
  contactPhone: 'phone',
  message: 'message',
};

const MONTH_OPTIONS = Array.from({ length: 11 }, (_, index) => ({
  label: index === 0 ? '1 mês' : `${index + 1} meses`,
  value: String(index + 1),
}));

const DEFAULT_ERROR_MESSAGE =
  'Verifique sua conexão e tente de novo. Se o erro continuar, fale com a gente pelo e-mail.';

// Mensagens por campo e por tipo de erro (chave = nome do erro do Validators/validador).
const FIELD_ERRORS: Partial<Record<FieldName, Record<string, string>>> = {
  shopName: {
    required: 'Informe o nome da loja.',
    minlength: 'Informe o nome da loja.',
    maxlength: 'Use até 60 caracteres.',
  },
  shopCode: {
    required: 'Informe o código da loja.',
    shopCode: 'Use só letras e números, como aparece no Seller Center.',
  },
  rate: {
    required: 'Informe a comissão da campanha.',
    rate: 'Use um valor entre 1% e 80%.',
  },
  gmv: {
    number: 'Use só números.',
    negative: 'Use um valor igual ou maior que zero.',
  },
  postRate: { percent: 'Use um número inteiro entre 0% e 100%.' },
  name: {
    required: 'Informe seu nome.',
    minlength: 'Informe seu nome.',
    maxlength: 'Use até 80 caracteres.',
  },
  email: {
    required: 'Informe seu e-mail.',
    email: 'E-mail inválido.',
    maxlength: 'Use até 120 caracteres.',
  },
  phone: {
    required: 'Informe seu WhatsApp.',
    phone: 'WhatsApp inválido: use DDD e número.',
  },
  message: { maxlength: 'Use até 1000 caracteres.' },
  consent: { required: 'Para enviar, aceite o uso dos dados para esta campanha.' },
};

/**
 * Converte o texto digitado em número.
 * Ponto só é separador de milhar quando segue o padrão "5.000" ou "1.000,50";
 * "70.5" continua sendo 70,5 e "13,5" vira 13,5.
 */
const toNumber = (raw: string): number => {
  const text = raw.trim();
  const withoutThousands = /^\d{1,3}(\.\d{3})+(,\d+)?$/.test(text) ? text.replace(/\./g, '') : text;
  return Number(withoutThousands.replace(',', '.'));
};

const normalizeCode = (raw: string): string => raw.trim().toUpperCase().replace(/\s+/g, '');

const shopCodeValidator: ValidatorFn = (control) => {
  const raw = String(control.value ?? '');
  if (!raw.trim()) return null;
  return /^[A-Z0-9]{6,20}$/.test(normalizeCode(raw)) ? null : { shopCode: true };
};

const rateValidator: ValidatorFn = (control) => {
  const raw = String(control.value ?? '');
  if (!raw.trim()) return null;
  const value = toNumber(raw);
  return value >= 1 && value <= 80 ? null : { rate: true };
};

const gmvValidator: ValidatorFn = (control) => {
  const raw = String(control.value ?? '');
  if (!raw.trim()) return null;
  const value = toNumber(raw);
  if (Number.isNaN(value)) return { number: true };
  return value >= 0 ? null : { negative: true };
};

// Post rate é porcentagem inteira (0 a 100), como o Seller Center pede.
const postRateValidator: ValidatorFn = (control) => {
  const raw = String(control.value ?? '');
  if (!raw.trim()) return null;
  const value = toNumber(raw);
  return Number.isInteger(value) && value >= 0 && value <= 100 ? null : { percent: true };
};

const phoneValidator: ValidatorFn = (control) => {
  const raw = String(control.value ?? '').trim();
  if (!raw) return null;
  return /^\+?[\d\s()-]{10,20}$/.test(raw) ? null : { phone: true };
};

// Critérios de amostra só são validados quando a loja oferece amostras.
const onlyWhenSamples =
  (validator: ValidatorFn): ValidatorFn =>
  (control) =>
    control.root.get('samples')?.value === 'sim' ? validator(control) : null;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink, ToastComponent],
  selector: 'app-criar-campanha-page',
  styleUrl: './criar-campanha.page.scss',
  templateUrl: './criar-campanha.page.html',
})
export class CampaignPage {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly campaignService = inject(CampaignService);
  private readonly destroyRef = inject(DestroyRef);
  private toastTimer: ReturnType<typeof setTimeout> | undefined;

  protected readonly monthOptions = MONTH_OPTIONS;
  protected readonly submitted = signal(false);
  protected readonly loading = signal(false);
  protected readonly toast = signal<ToastMessage | null>(null);

  // Erros devolvidos pela API (400), mostrados no campo até o usuário alterá-lo.
  protected readonly serverErrors = signal<Partial<Record<FieldName, string>>>({});
  protected readonly hasServerErrors = computed(() => Object.keys(this.serverErrors()).length > 0);

  protected readonly form = this.fb.group({
    shopName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    shopCode: ['', [Validators.required, shopCodeValidator]],
    rate: ['', [Validators.required, rateValidator]],
    months: ['6', [Validators.required]],
    samples: ['nao' as SampleChoice],
    gmv: ['', [onlyWhenSamples(gmvValidator)]],
    postRate: ['', [onlyWhenSamples(postRateValidator)]],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    phone: ['', [Validators.required, phoneValidator]],
    message: ['', [Validators.maxLength(1000)]],
    consent: [false, [Validators.requiredTrue]],
    // Campo anti-robô: escondido do usuário, deve ficar vazio.
    website: [''],
  });

  protected readonly samplesYes = toSignal(
    this.form.controls.samples.valueChanges.pipe(map((value) => value === 'sim')),
    { initialValue: false },
  );

  constructor() {
    this.form.controls.samples.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.form.controls.gmv.updateValueAndValidity();
      this.form.controls.postRate.updateValueAndValidity();
    });

    // Ao corrigir um campo, some o erro vindo do servidor dele.
    for (const name of FIELD_NAMES) {
      const control: AbstractControl = this.form.controls[name];
      control.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.clearServerError(name));
    }

    this.destroyRef.onDestroy(() => clearTimeout(this.toastTimer));
  }

  /** Mensagem de erro do campo: primeiro a do servidor, depois a de validação local. */
  protected error(name: FieldName): string | null {
    const serverError = this.serverErrors()[name];
    if (serverError) return serverError;

    const control = this.form.controls[name];
    if (!control.invalid || !(control.touched || this.submitted())) return null;
    const key = Object.keys(control.errors ?? {})[0];
    return (key && FIELD_ERRORS[name]?.[key]) || null;
  }

  protected submit(): void {
    if (this.loading()) return;

    this.submitted.set(true);
    this.serverErrors.set({});

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.focusFirstInvalid();
      return;
    }

    this.loading.set(true);

    this.campaignService
      .submit(this.buildFormData())
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (status) => {
          this.showSuccess(status);
          this.resetForm();
        },
        error: (error: unknown) => this.handleError(error),
      });
  }

  private showSuccess(status: CampaignStatus): void {
    if (status === 'already_open') {
      this.showToast({
        kind: 'success',
        title: 'Já recebemos um pedido desta loja.',
        message: 'Seu pedido segue em análise. Respondemos em até 2 dias úteis pelo e-mail informado.',
      });
      return;
    }

    this.showToast({
      kind: 'success',
      title: 'Cadastro enviado!',
      message: 'Recebemos seus dados. Em até 2 dias úteis você recebe o e-mail com o próximo passo.',
    });
  }

  private handleError(error: unknown): void {
    const body = error instanceof HttpErrorResponse ? (error.error as ApiErrorBody | null) : null;

    // 400: erros por campo voltam junto do formulário; o que não tiver campo vai no toast.
    if (error instanceof HttpErrorResponse && error.status === 400) {
      const mapped: Partial<Record<FieldName, string>> = {};
      const unmapped: string[] = [];

      for (const field of body?.error?.details?.fields ?? []) {
        const name = API_FIELD_MAP[field.path];
        if (name) {
          mapped[name] = field.message;
        } else {
          unmapped.push(field.message);
        }
      }

      if (Object.keys(mapped).length > 0) {
        this.serverErrors.set(mapped);
        this.focusFirstInvalid();
      }

      if (unmapped.length > 0 || Object.keys(mapped).length === 0) {
        this.showToast({
          kind: 'error',
          title: 'Não foi possível enviar',
          message: unmapped[0] ?? body?.error?.message ?? DEFAULT_ERROR_MESSAGE,
        });
      }
      return;
    }

    // 429 e 500 (ou falha de rede) usam a mensagem da API quando ela existe.
    this.showToast({
      kind: 'error',
      title: 'Não foi possível enviar',
      message: body?.error?.message ?? DEFAULT_ERROR_MESSAGE,
    });
  }

  private buildFormData(): CampaignFormData {
    const value = this.form.getRawValue();
    const offersSamples = value.samples === 'sim';

    return {
      shopName: value.shopName.trim(),
      shopCode: normalizeCode(value.shopCode),
      commissionRate: toNumber(value.rate),
      durationMonths: Number(value.months),
      offersSamples,
      sampleMinGmvReais: offersSamples && value.gmv.trim() ? toNumber(value.gmv) : null,
      sampleMinPostRate: offersSamples && value.postRate.trim() ? toNumber(value.postRate) : null,
      name: value.name.trim(),
      email: value.email.trim(),
      whatsapp: value.phone.trim(),
      message: value.message.trim(),
      website: value.website.trim(),
    };
  }

  private clearServerError(name: FieldName): void {
    if (!this.serverErrors()[name]) return;
    this.serverErrors.update((errors) => {
      const next = { ...errors };
      delete next[name];
      return next;
    });
  }

  private resetForm(): void {
    this.form.reset();
    this.submitted.set(false);
    this.serverErrors.set({});
  }

  private focusFirstInvalid(): void {
    // Espera o Angular atualizar o DOM com as mensagens de erro antes de focar.
    setTimeout(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
  }

  private showToast(message: ToastMessage): void {
    clearTimeout(this.toastTimer);
    this.toast.set(message);
    this.toastTimer = setTimeout(() => this.toast.set(null), 6000);
  }
}
