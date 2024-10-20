import { Component } from '@angular/core';
import { BannerComponent } from '../../@theme/components/banner/banner.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../@theme/components/button/button.component';
import { TextFieldComponent } from '../../@theme/components/text-field/text-field.component';
import { SelectComponent } from '../../@theme/components/select/select.component';
import { AuthService } from '../../@core/services/auth.service';
import { ApiService } from '../../@core/services/api.service';
import { BaseResponse } from '../../@core/types/base-response.type';
import { Department } from '../../@core/types/departament.type';
import { TypeOfIdea } from '../../@core/types/typeofidea.type';
import { LoadingService } from '../../@core/services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Campaign } from '../../@core/types/campaign.type';
import { HotToastService } from '@ngxpert/hot-toast';
import moment from 'moment';
import 'moment/locale/pt-br';
import { CheckboxComponent } from '../../@theme/components/checkbox/checkbox.component';
import { DialogService } from '../../@core/services/dialog.service';
import { TermsComponent } from '../../@theme/modals/terms/terms.component';
import { InfoComponent } from '../../@theme/modals/info/info.component';

moment.locale('pt-br');

@Component({
  selector: 'inova-campaigns',
  standalone: true,
  imports: [
    BannerComponent,

    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    TextFieldComponent,
    SelectComponent,
    CheckboxComponent
  ],
  providers: [
    LoadingService,
    DialogService
  ],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss'
})
export class CampaignsComponent {

  form!: FormGroup;
  department?: Department[];
  typeOfIdea?: TypeOfIdea[];
  campaign?: Campaign;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private hotToast: HotToastService,
    private dialogService: DialogService
  ) {
    this.form = this.formBuilder.group({
      campaignId: [null, []],
      departmentId: [null, [Validators.required]],
      typeOfIdeaId: [null, [Validators.required]],
      title: [null, [Validators.required, Validators.minLength(6)]],
      idea: [null, [Validators.required, Validators.minLength(6)]],
      agree: [null, [Validators.required, Validators.requiredTrue]],
    });

    this.loadAll();
    this.form.get('campaignId')?.setValue(this.campaignId);
  }

  submit() {
    this.form.disable();
    this.loadingService.show();

    this.apiService.post('idea', this.form.value).subscribe(() => {
      this.loadingService.hide();

      this.dialogService.open(InfoComponent, { 
        title: 'Ideia cadastrada com sucesso!', 
        message: 'Sua ideia foi enviada para avaliação do nosso comitê interno. Você pode acompanhar o andamento diretamente na Central de Ideias.',
        buttonLabel: 'Acessar central de ideias'
      }).onClose.subscribe(() => {
        this.router.navigate(['./ideas-center']);
      })

    }, (result: any) => {

      this.form.enable();
      this.loadingService.hide();

      if (!result.error?.error) {
        this.hotToast.error('Erro na conexão com o servidor');
      }
    });

  }

  get campaignId() {
    return this.activatedRoute.snapshot.paramMap.get('campaignId')
  }

  get userName() {
    return this.authService.user?.name
  }

  async loadAll() {
    this.loadingService.show();

    await Promise.all([
      this.departamentPromise.then((result) => this.department = result),
      this.typeOfIdeaPromise.then((result) => this.typeOfIdea = result),
      this.campaignPromise.then((result) => this.campaign = result)
    ]).then(() => {
      this.loadingService.hide();

      if (!this.isOpen) {
        this.router.navigate(['/']);
        this.hotToast.error('Esta campanha não está aberta!');
        return;
      }

    });
  }

  private get departamentPromise(): Promise<Department[]> {
    return new Promise((resolve) => {
      this.apiService.get('department').subscribe({
        next: (result: BaseResponse<Department[]>) => {
          resolve(result.data);
        }
      });
    });
  }

  private get typeOfIdeaPromise(): Promise<TypeOfIdea[]> {
    return new Promise((resolve) => {
      this.apiService.get('typeofidea').subscribe({

        next: (result: BaseResponse<TypeOfIdea[]>) => {
          resolve(result.data);
        }
      });
    });
  }

  private get campaignPromise(): Promise<Campaign> {
    return new Promise((resolve) => {
      this.apiService.get(`campaign/${this.campaignId}`).subscribe({
        next: (result: BaseResponse<Campaign>) => {
          resolve(result.data);
        }
      });
    });
  }

  get departamentItems() {
    if (!this.department) {
      return [];
    }

    return this.department.map((item) => {
      return {
        label: item.name,
        value: item.id
      }
    })
  }

  get typeOfIdeaItems() {
    if (!this.typeOfIdea) {
      return [];
    }

    return this.typeOfIdea.map((item) => {
      return {
        label: item.name,
        value: item.id
      }
    })
  }

  get startDate(): string {
    return moment(this.campaign?.startDate).format('D [de] MMMM [de] YYYY')
  }

  get endDate(): string {
    return moment(this.campaign?.endDate).format('D [de] MMMM [de] YYYY')
  }

  get isOpen(): boolean {
    const startDate = moment(this.campaign?.startDate);
    const endDate = moment(this.campaign?.endDate);
    return moment().isBetween(startDate, endDate);
  }
  
  openTerms() {
    this.dialogService.open(TermsComponent)
  }

}
