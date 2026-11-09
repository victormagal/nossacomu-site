import { Injectable } from '@angular/core';
import { Observable, map, timer } from 'rxjs';

export interface CampaignPayload {
  shopName: string;
  shopCode: string;
  commissionRate: number;
  durationMonths: number;
  offersSamples: boolean;
  sampleCriteria: { minGmv: number | null; minPostRate: number | null } | null;
  name: string;
  email: string;
  whatsapp: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class CampaignService {
  /**
   * TODO (integração): trocar pelo envio ao Comu Hub (POST /api/public/tap/requests)
   * com estes mesmos campos. Por enquanto simula a requisição para o estado de
   * carregamento e os avisos de sucesso/erro poderem ser testados.
   */
  submit(_payload: CampaignPayload): Observable<void> {
    return timer(1200).pipe(map(() => undefined));
  }
}
