import { Component } from '@angular/core';
import { TextFieldComponent } from '../../@theme/components/text-field/text-field.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../@theme/components/button/button.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../@core/services/auth.service';
import { HotToastService } from '@ngxpert/hot-toast';

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
  invalid: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private hotToast: HotToastService) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }
  
  submit() {

    this.form.disable();

    this.authService.login(this.form.value).subscribe(() => {
      this.invalid = false;
      this.hotToast.success('Login efetuado com sucesso!');
    }, (result: any) => {

      this.form.enable();

      if(result.error?.error) {
        this.invalid = true;
      } else {
        this.hotToast.error('Erro na conexão com o servidor');
      }

    });

  }

}
