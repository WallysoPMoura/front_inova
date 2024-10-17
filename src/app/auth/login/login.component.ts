import { Component, OnInit } from '@angular/core';
import { TextFieldComponent } from '../../@theme/components/text-field/text-field.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../@theme/components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'inova-login',
  standalone: true,
  imports: [
    TextFieldComponent,
    ButtonComponent,

    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }
  
}
