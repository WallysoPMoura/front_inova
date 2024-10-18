import { Component } from '@angular/core';
import { TextFieldComponent } from '../../@theme/components/text-field/text-field.component';
import { ButtonComponent } from '../../@theme/components/button/button.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../@core/services/auth.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'inova-change-password',
  standalone: true,
  imports: [
    TextFieldComponent,
    ButtonComponent,

    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private hotToast: HotToastService
  ) {
    this.form = this.formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(6)]],
      password_confirmation: [null, [Validators.required, Validators.minLength(6)]]
    });

    if(!this.token) {
      this.router.navigate(['/auth/forgot-password']);
    }

  }

  get token() {
    return this.activatedRoute.snapshot.queryParamMap.get('token');
  }

  get passwordMatching(): boolean {
    return this.form.get('password')?.value === this.form.get('password_confirmation')?.value;
  }


  submit() {

    this.form.disable();

    this.authService.changePassword({...this.form.value, token: this.token}).subscribe(() => {
      
      this.form.enable();
      this.router.navigate(['/auth/login']);

      this.hotToast.success('Senha alterada com sucesso!');

    }, (result: any) => {

      this.form.enable();

      if (!result.error?.error) {
        this.hotToast.error('Erro na conexão com o servidor');
      } else {
        this.hotToast.error('O token informado é inválido');
      }

    });

  }

  

}
