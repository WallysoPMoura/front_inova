import { Component, Input, OnInit } from '@angular/core';
import { Idea } from '../../../@core/types/idea.type';
import { DialogRef } from '../../../@core/services/dialogref.service';
import { SelectComponent } from '../../components/select/select.component';
import { TextFieldComponent } from '../../components/text-field/text-field.component';
import { SelectItem } from '../../../@core/types/select.type';
import { ApiService } from '../../../@core/services/api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingService } from '../../../@core/services/loading.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'inova-evaluation',
  standalone: true,
  imports: [TextFieldComponent, SelectComponent, FormsModule, ReactiveFormsModule],
  providers: [
    LoadingService
  ],
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.scss'
})
export class EvaluationComponent implements OnInit {

  @Input() idea!: Idea;

  form: FormGroup;

  constructor(
    public dialogRef: DialogRef,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private toastService: HotToastService
  ) {
    this.form = formBuilder.group({
      ideaId: [null],
      inovation: [null, [Validators.required,]],
      implementation: [null, Validators.required],
      observation: [null, [Validators.required, Validators.minLength(6)]]
    })
  }
  ngOnInit(): void {
    this.form.get('ideaId')?.setValue(this.idea.id);
  }

  get notes(): SelectItem[] {
    return [
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
      { value: 6, label: '6' },
      { value: 7, label: '7' },
      { value: 8, label: '8' },
      { value: 9, label: '9' },
      { value: 10, label: '10' }
    ]
  }

  evaluate() {
    this.loadingService.show();
    this.apiService.post('evaluation', this.form.value).subscribe({
      next: () => {
        this.loadingService.hide();
        this.toastService.success('Avaliação enviada com sucesso!');
        this.dialogRef.close({
          success: true
        });
      },
      error: () => {
        this.loadingService.hide();
        this.toastService.error('Erro ao avaliar a ideia');
      }
    })
  }

}
