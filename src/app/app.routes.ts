import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { CodeValideComponent } from './auth/code-valide/code-valide.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';

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
                component: LoginComponent
            },
            {
                path: 'cpde-validate',
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
