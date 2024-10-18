import { Component } from '@angular/core';
import { TextFieldComponent } from '../../@theme/components/text-field/text-field.component';
import { ButtonComponent } from '../../@theme/components/button/button.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../@core/services/auth.service';
import { HotToastService } from '@ngxpert/hot-toast';

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
  invalid: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private hotToast: HotToastService
  ) {
    this.form = this.formBuilder.group({
      token: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    });

    if(!this.email) {
      this.router.navigate(['/auth/forgot-password']);
    }

  }

  get email() {
    return this.activatedRoute.snapshot.queryParamMap.get('email');
  }

  submit() {

    this.form.disable();

    this.authService.validateCode(this.form.value).subscribe(() => {
      
      this.form.enable();
      this.invalid = false;
      this.router.navigate(['/auth/change-password'], { queryParams: { token: this.form.value.token } });

    }, (result: any) => {

      this.form.enable();

      if (!result.error?.error) {
        this.hotToast.error('Erro na conexão com o servidor');
      } else {
        this.invalid = true;
      }

    });

  }

}
