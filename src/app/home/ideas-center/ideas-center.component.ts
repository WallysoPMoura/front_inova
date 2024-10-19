import { Component } from '@angular/core';
import { ProfileComponent } from '../../@theme/components/profile/profile.component';
import { RankComponent } from '../../@theme/components/rank/rank.component';
import { BannerComponent } from '../../@theme/components/banner/banner.component';
import { ApiService } from '../../@core/services/api.service';
import { RankItem } from '../../@core/types/rank.type';
import { BasePaginateResponse, BaseResponse } from '../../@core/types/base-response.type';
import { LoadingService } from '../../@core/services/loading.service';
import { TextFieldComponent } from '../../@theme/components/text-field/text-field.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { Idea } from '../../@core/types/idea.type';
import { Campaign } from '../../@core/types/campaign.type';
import { SelectComponent } from '../../@theme/components/select/select.component';

@Component({
  selector: 'inova-ideas-center',
  standalone: true,
  imports: [
    ProfileComponent,
    RankComponent,
    BannerComponent,
    TextFieldComponent,
    SelectComponent
  ],
  providers: [
    LoadingService
  ],
  templateUrl: './ideas-center.component.html',
  styleUrl: './ideas-center.component.scss'
})
export class IdeasCenterComponent {

  more_submited?: RankItem[];
  more_implemented?: RankItem[];
  ideas?: BasePaginateResponse<Idea[]>;
  campaigns?: Campaign[];

  searchSubject: Subject<string> = new Subject<string>();

  page: number = 1;

  constructor(
    private apiService: ApiService, 
    private loadingService: LoadingService,
    private toastService: HotToastService
  ) {
    this.loadAll();
    this.handleSubject();
  }

  private async loadAll() {
    this.loadingService.show();

    await Promise.all([
      this.submittedPromise.then((result) => this.more_submited = result),
      this.implementedPromise.then((result) => this.more_implemented = result),
      this.ideasPromise.then((result) => this.ideas = result),
      this.campaignsPromise.then((result) => this.campaigns = result)
    ]).then(() => {
      this.loadingService.hide();
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

  private get ideasPromise(): Promise<BasePaginateResponse<Idea[]>> {
    return new Promise((resolve) => {
      this.apiService.get('idea', { page: this.page }).subscribe({
        next: (result: BasePaginateResponse<Idea[]>) => {
          resolve(result);
        }
      });
    });
  }

  private get campaignsPromise(): Promise<Campaign[]> {
    return new Promise((resolve) => {
      this.apiService.get('campaign', { page: this.page }).subscribe({
        next: (result: BaseResponse<Campaign[]>) => {
          resolve(result.data);
        }
      });
    });
  }

  handleSubject() {
    this.searchSubject
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => this.search(value));
  }

  search(event: any) {
    this.loadingService.show()
    this.apiService.get(`idea/search`, { search: event }).subscribe({
      next: (result: BasePaginateResponse<Idea[]>) => {
        this.ideas = result;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
        this.toastService.error('Erro na conexão com o servidor');
      }
    })
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
