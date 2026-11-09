import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize, map } from 'rxjs';
import { ToastComponent, ToastMessage } from '../../shared/components/toast/toast.component';
import { CampaignPayload, CampaignService } from './campaign.service';

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

const MONTH_OPTIONS = Array.from({ length: 11 }, (_, index) => ({
  label: index === 0 ? '1 mês' : `${index + 1} meses`,
  value: String(index + 1),
}));

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
  gmv: { number: 'Use só números.' },
  postRate: { percent: 'Use um valor entre 0% e 100%.' },
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

const toNumber = (raw: string): number => Number(raw.trim().replace(/\./g, '').replace(',', '.'));

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

const numberValidator: ValidatorFn = (control) => {
  const raw = String(control.value ?? '');
  if (!raw.trim()) return null;
  return Number.isNaN(toNumber(raw)) ? { number: true } : null;
};

const percentValidator: ValidatorFn = (control) => {
  const raw = String(control.value ?? '');
  if (!raw.trim()) return null;
  const value = toNumber(raw);
  return value >= 0 && value <= 100 ? null : { percent: true };
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

  protected readonly form = this.fb.group({
    shopName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    shopCode: ['', [Validators.required, shopCodeValidator]],
    rate: ['', [Validators.required, rateValidator]],
    months: ['6', [Validators.required]],
    samples: ['nao' as SampleChoice],
    gmv: ['', [onlyWhenSamples(numberValidator)]],
    postRate: ['', [onlyWhenSamples(percentValidator)]],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    phone: ['', [Validators.required, phoneValidator]],
    message: ['', [Validators.maxLength(1000)]],
    consent: [false, [Validators.requiredTrue]],
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

    this.destroyRef.onDestroy(() => clearTimeout(this.toastTimer));
  }

  /** Mensagem de erro do campo, mostrada só depois de tocar no campo ou enviar o formulário. */
  protected error(name: FieldName): string | null {
    const control = this.form.controls[name];
    if (!control.invalid || !(control.touched || this.submitted())) return null;
    const key = Object.keys(control.errors ?? {})[0];
    return (key && FIELD_ERRORS[name]?.[key]) || null;
  }

  protected submit(): void {
    if (this.loading()) return;

    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.focusFirstInvalid();
      return;
    }

    this.loading.set(true);

    this.campaignService
      .submit(this.buildPayload())
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.showToast({
            kind: 'success',
            title: 'Cadastro enviado!',
            message:
              'Recebemos seus dados. Em até 2 dias úteis você recebe o e-mail com o próximo passo.',
          });
          this.resetForm();
        },
        error: () =>
          this.showToast({
            kind: 'error',
            title: 'Não foi possível enviar',
            message:
              'Verifique sua conexão e tente de novo. Se o erro continuar, fale com a gente pelo e-mail.',
          }),
      });
  }

  private buildPayload(): CampaignPayload {
    const value = this.form.getRawValue();
    const offersSamples = value.samples === 'sim';

    return {
      shopName: value.shopName.trim(),
      shopCode: normalizeCode(value.shopCode),
      commissionRate: toNumber(value.rate),
      durationMonths: Number(value.months),
      offersSamples,
      sampleCriteria: offersSamples
        ? {
            minGmv: value.gmv.trim() ? toNumber(value.gmv) : null,
            minPostRate: value.postRate.trim() ? toNumber(value.postRate) : null,
          }
        : null,
      name: value.name.trim(),
      email: value.email.trim(),
      whatsapp: value.phone.trim(),
      message: value.message.trim(),
    };
  }

  private resetForm(): void {
    this.form.reset();
    this.submitted.set(false);
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
