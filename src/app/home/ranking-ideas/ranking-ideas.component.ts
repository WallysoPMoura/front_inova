import { Component } from '@angular/core';
import { ScoreComponent } from '../../@theme/components/score/score.component';
import { IdeasSubmittedComponent } from '../../@theme/components/ideas-submitted/ideas-submitted.component';
import { Campaign } from '../../@core/types/campaign.type';
import { ApiService } from '../../@core/services/api.service';
import { BaseResponse } from '../../@core/types/base-response.type';
import { LoadingService } from '../../@core/services/loading.service';
import { RankItem, RankUser } from '../../@core/types/rank.type';
import { RankComponent } from '../../@theme/components/rank/rank.component';
import { SelectComponent } from '../../@theme/components/select/select.component';

@Component({
  selector: 'inova-ranking-ideas',
  standalone: true,
  imports: [
    IdeasSubmittedComponent,
    ScoreComponent,
    RankComponent,
    SelectComponent
  ],
  providers: [
    LoadingService
  ],
  templateUrl: './ranking-ideas.component.html',
  styleUrl: './ranking-ideas.component.scss'
})
export class RankingIdeasComponent {

  campaigns: Campaign[] = [];
  more_submited?: RankItem[];
  more_implemented?: RankItem[];
  rank_evaluations?: RankItem[]
  rank_user?: RankUser;


  constructor(
    private apiService: ApiService,
    private loadingService: LoadingService
  ) {
    this.loadAll();
  }

  private async loadAll() {
    this.loadingService.show();

    await Promise.all([
      this.submittedPromise.then((result) => this.more_submited = result),
      this.implementedPromise.then((result) => this.more_implemented = result),
      this.campaignsPromise.then((result) => this.campaigns = result),
      this.rankPromise.then((result) => this.rank_evaluations = result),
      this.rankUserPromise.then((result) => this.rank_user = result)
    ]).then(() => {
      this.loadingService.hide();
    });
  }

  private get campaignsPromise(): Promise<Campaign[]> {
    return new Promise((resolve) => {
      this.apiService.get('campaign').subscribe({
        next: (result: BaseResponse<Campaign[]>) => {
          resolve(result.data);
        }
      });
    });
  }

  private get submittedPromise(): Promise<RankItem[]> {
    return new Promise((resolve) => {
      this.apiService.get('idea/more-submitted').subscribe({
        next: (result: BaseResponse<RankItem[]>) => {
          resolve(result.data);
        }
      });
    });
  }

  private get implementedPromise(): Promise<RankItem[]> {
    return new Promise((resolve) => {
      this.apiService.get('idea/more-implemented').subscribe({
        next: (result: BaseResponse<RankItem[]>) => {
          resolve(result.data);
        }
      });
    });
  }

  private get rankPromise(): Promise<RankItem[]> {
    return new Promise((resolve) => {
      this.apiService.get('evaluation/rank').subscribe({
        next: (result: BaseResponse<RankItem[]>) => {
          resolve(result.data);
        }
      });
    });
  }

  private get rankUserPromise(): Promise<RankUser> {
    return new Promise((resolve) => {
      this.apiService.get('idea/byUser').subscribe({
        next: (result: BaseResponse<RankUser>) => {
          resolve(result.data);
        }
      });
    });
  }

  get campaignsItems() {
    if (!this.campaigns) {
      return [];
    }

    return this.campaigns.map((item) => {
      return {
        label: item.name,
        value: item.id
      }
    })
  }

}
