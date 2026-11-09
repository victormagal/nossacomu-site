import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

// Endpoint do Comu Hub (documento "API do formulário de campanha da marca").
const CAMPAIGN_REQUEST_URL = 'https://comuhub.tiktally.com.br/api/public/tap/requests';

/** Dados do formulário, já normalizados (valores em reais e em número). */
export interface CampaignFormData {
  shopName: string;
  shopCode: string;
  commissionRate: number;
  durationMonths: number;
  offersSamples: boolean;
  sampleMinGmvReais: number | null;
  sampleMinPostRate: number | null;
  name: string;
  email: string;
  whatsapp: string;
  message: string;
  /** Campo anti-robô: deve ir vazio. */
  website: string;
}

/** `received`: pedido recebido. `already_open`: a loja já tem um pedido em análise. */
export type CampaignStatus = 'received' | 'already_open';

/** Formato de erro devolvido pela API (HTTP 400, 429 e 500). */
export interface ApiErrorBody {
  error?: {
    code?: string;
    message?: string;
    details?: { fields?: { path: string; message: string }[] };
  };
}

interface CampaignRequestBody {
  brandName: string;
  shopCode: string;
  commissionRate: number;
  months: number;
  offersSamples: boolean;
  sampleMinGmvMinor?: number;
  sampleMinPostRate?: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  message?: string;
  website: string;
}

/** Converte o formulário para o JSON da API. GMV vai em centavos e os campos de amostra só com "Sim". */
const toRequestBody = (data: CampaignFormData): CampaignRequestBody => {
  const body: CampaignRequestBody = {
    brandName: data.shopName,
    shopCode: data.shopCode,
    commissionRate: data.commissionRate,
    months: data.durationMonths,
    offersSamples: data.offersSamples,
    contactName: data.name,
    contactEmail: data.email,
    contactPhone: data.whatsapp,
    website: data.website,
  };

  if (data.message) {
    body.message = data.message;
  }

  if (data.offersSamples) {
    if (data.sampleMinGmvReais !== null) {
      body.sampleMinGmvMinor = Math.round(data.sampleMinGmvReais * 100);
    }
    if (data.sampleMinPostRate !== null) {
      body.sampleMinPostRate = data.sampleMinPostRate;
    }
  }

  return body;
};

@Injectable({ providedIn: 'root' })
export class CampaignService {
  private readonly http = inject(HttpClient);

  submit(data: CampaignFormData): Observable<CampaignStatus> {
    return this.http
      .post<{ status: CampaignStatus }>(CAMPAIGN_REQUEST_URL, toRequestBody(data))
      .pipe(map((response) => response.status));
  }
}
