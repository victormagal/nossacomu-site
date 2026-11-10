import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { formatarDataCard, VagaDetalhe, VagasService } from './vagas.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  selector: 'app-vaga-page',
  styleUrl: './vaga.page.scss',
  templateUrl: './vaga.page.html',
})
export class VagaPage {
  private readonly vagasService = inject(VagasService);
  private readonly title = inject(Title);

  protected readonly formatarData = formatarDataCard;

  // undefined = carregando; null = vaga não encontrada ou não publicada.
  protected readonly vaga = toSignal<VagaDetalhe | null | undefined>(
    inject(ActivatedRoute).paramMap.pipe(
      map((params) => params.get('slug') ?? ''),
      switchMap((slug) =>
        this.vagasService.buscarPorSlug(slug).pipe(
          catchError(() => of(null)),
          tap((item) =>
            this.title.setTitle(
              item ? `${item.title} | Carreiras na Comu` : 'Vaga não encontrada | Comu',
            ),
          ),
        ),
      ),
    ),
    { initialValue: undefined },
  );
}
