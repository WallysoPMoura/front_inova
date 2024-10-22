import { Component } from '@angular/core';
import { ProfileComponent } from '../../@theme/components/profile/profile.component';
import { RankComponent } from '../../@theme/components/rank/rank.component';
import { BannerComponent } from '../../@theme/components/banner/banner.component';
import { ApiService } from '../../@core/services/api.service';
import { RankItem } from '../../@core/types/rank.type';
import { BasePaginateResponse, BaseResponse } from '../../@core/types/base-response.type';
import { LoadingService } from '../../@core/services/loading.service';
import { TextFieldComponent } from '../../@theme/components/text-field/text-field.component';
import { debounceTime, distinctUntilChanged, map, Subject } from 'rxjs';
import { Idea } from '../../@core/types/idea.type';
import { Campaign } from '../../@core/types/campaign.type';
import { SelectComponent } from '../../@theme/components/select/select.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as _ from 'lodash';
import { IdeasComponent } from '../../@theme/components/ideas/ideas.component';
import { AuthService } from '../../@core/services/auth.service';

@Component({
  selector: 'inova-ideas-center',
  standalone: true,
  imports: [
    ProfileComponent,
    RankComponent,
    BannerComponent,
    TextFieldComponent,
    SelectComponent,

    IdeasComponent,

    FormsModule,
    ReactiveFormsModule
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
  paginatedIdeas?: BasePaginateResponse<Idea[]>;
  campaigns?: Campaign[];

  featured_campaign?: Campaign;

  searchSubject: Subject<any> = new Subject<any>();

  page: number = 1;

  form!: FormGroup;

  constructor(
    private apiService: ApiService,
    private loadingService: LoadingService,
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) {
    this.loadAll();
    this.handleSubject();
    this.buildForm();
  }

  private async loadAll() {
    this.loadingService.show();

    await Promise.all([
      this.submittedPromise.then((result) => this.more_submited = result),
      this.implementedPromise.then((result) => this.more_implemented = result),
      this.campaignsPromise.then((result) => this.campaigns = result),
      this.featuredCampaign.then((result) => this.featured_campaign = result),
      this.getIdeasPromise().then((result) => this.paginatedIdeas = result),
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

  private getIdeasPromise(filters?: any): Promise<BasePaginateResponse<Idea[]>> {
    return new Promise((resolve) => {
      this.apiService.get('idea', { page: this.page, ...filters}).subscribe({
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

  private get featuredCampaign(): Promise<Campaign> {
    return new Promise((resolve) => {
      this.apiService.get('campaign/random').subscribe({
        next: (result: BaseResponse<Campaign>) => {
          resolve(result.data);
        }
      });
    });
  }

  handleSubject() {
    this.searchSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        map((value) => _.omitBy(value, _.isNull))
      )
      .subscribe((value: any) => this.getIdeasPromise(value).then((result) => this.paginatedIdeas = result));
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

  private buildForm() {
    this.form = this.formBuilder.group({
      campaignId: [null],
      idea: [null]
    });

    this.form.valueChanges.subscribe((value) => this.searchSubject.next(value));
  }

  changePage(page: number) {
    this.page = page;
    this.getIdeasPromise(this.form.value).then((result) => this.paginatedIdeas = result);
  }

}
