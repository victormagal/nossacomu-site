import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

// Endpoint do WPGraphQL no WordPress (o mesmo para dev, homolog e main).
const WP_GRAPHQL_URL = 'https://admin.nossacomu.com.br/graphql';

const LISTA_VAGAS = `query Vagas {
  vagas(first: 6, where: { status: PUBLISH }) {
    nodes {
      title
      slug
      modified
      camposDeVaga {
        descritivo
      }
    }
  }
}`;

export interface Vaga {
  title: string;
  slug: string;
  /** Data da última atualização, no formato ISO do WordPress. */
  modified: string;
  camposDeVaga: { conteudo: string | null } | null;
}

const DETALHE_VAGA = `query VagaPorSlug($slug: ID!) {
  vaga(id: $slug, idType: SLUG) {
    title
    slug
    modified
    camposDeVaga {
      conteudo
    }
  }
}`;

export interface VagaDetalhe extends Omit<Vaga, 'camposDeVaga'> {
  camposDeVaga: { conteudo: string | null } | null;
}

interface VagaResponse {
  data: { vaga: VagaDetalhe | null };
}

interface VagasResponse {
  data: { vagas: { nodes: Vaga[] } };
}

@Injectable({ providedIn: 'root' })
export class VagasService {
  private readonly http = inject(HttpClient);

  /** Uma vaga pelo slug, ou `null` se não existir ou não estiver publicada. */
  buscarPorSlug(slug: string): Observable<VagaDetalhe | null> {
    const params = new HttpParams().set('query', DETALHE_VAGA).set('variables', JSON.stringify({ slug }));
    return this.http
      .get<VagaResponse>(WP_GRAPHQL_URL, { params })
      .pipe(map((response) => response.data.vaga));
  }

  /**
   * Vagas publicadas. Usa GET (e não POST) para que o HTTP transfer cache do Angular
   * reaproveite, no navegador, a resposta já buscada durante o build.
   */
  listar(): Observable<Vaga[]> {
    const params = new HttpParams({ fromObject: { query: LISTA_VAGAS } });
    return this.http
      .get<VagasResponse>(WP_GRAPHQL_URL, { params })
      .pipe(map((response) => response.data.vagas.nodes));
  }
}

const FORMATO_DATA_CARD = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  timeZone: 'UTC',
  year: 'numeric',
});

/**
 * Formata a data no mesmo padrão dos cards de "Na Mídia": "05 NOV 2026".
 * Usa só a parte da data, então o fuso do servidor não altera o dia exibido.
 */
export function formatarDataCard(isoDate: string): string {
  const [year, month, day] = isoDate.slice(0, 10).split('-').map(Number);
  const parts = FORMATO_DATA_CARD.formatToParts(new Date(Date.UTC(year, month - 1, day)));
  const valor = (tipo: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === tipo)?.value ?? '';
  return `${valor('day')} ${valor('month').replace(/\./g, '').toUpperCase()} ${valor('year')}`;
}
