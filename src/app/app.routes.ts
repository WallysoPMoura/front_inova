import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { CodeValideComponent } from './auth/code-valide/code-valide.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent
            },
            {
                path: 'code-validate',
                component: CodeValideComponent
            },
            {
                path: 'change-password',
                component: ChangePasswordComponent
            },
            {
                path: '**',
                redirectTo: 'login'
            }
        ]
    }
];
