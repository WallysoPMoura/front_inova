import { Component } from '@angular/core';
import { TextFieldComponent } from '../../@theme/components/text-field/text-field.component';
import { ButtonComponent } from '../../@theme/components/button/button.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../@core/services/auth.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'inova-forgot-password',
  standalone: true,
  imports: [
    TextFieldComponent,
    ButtonComponent,

    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private hotToast: HotToastService,
    private router: Router,
    
  ) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });

  }

  submit() {

    this.form.disable();

    this.authService.forgotPassword(this.form.value).subscribe(() => {
      this.hotToast.success('Se o usuário existir, um e-mail será enviado para redefinir a senha');
      this.router.navigate(['/auth/code-validate'], { queryParams: { email: this.form.value.email } });
    }, (result: any) => {

      this.form.enable();

      if (!result.error?.error) {
        this.hotToast.error('Erro na conexão com o servidor');
      }

    });

  }

}
