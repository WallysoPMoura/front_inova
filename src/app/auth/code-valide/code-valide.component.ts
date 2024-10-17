import { Component } from '@angular/core';
import { TextFieldComponent } from '../../@theme/components/text-field/text-field.component';
import { ButtonComponent } from '../../@theme/components/button/button.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'inova-code-valide',
  standalone: true,
  imports: [
    TextFieldComponent,
    ButtonComponent,

    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './code-valide.component.html',
  styleUrl: './code-valide.component.scss'
})
export class CodeValideComponent {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      code: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    });
  }

  get email() {
    return 'wallyso.moura@queropassagem.com.br'
  }

}
