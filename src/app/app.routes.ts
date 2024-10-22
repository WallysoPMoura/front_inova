import { Router, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { CodeValideComponent } from './auth/code-valide/code-valide.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './@core/guards/auth.guard';
import { IdeasCenterComponent } from './home/ideas-center/ideas-center.component';
import { CampaignsComponent } from './home/campaigns/campaigns.component';
import { RankingIdeasComponent } from './home/ranking-ideas/ranking-ideas.component';
import { Inject } from '@angular/core';
import { AuthService } from './@core/services/auth.service';

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
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'ideas-center',
                component: IdeasCenterComponent
            },
            {
                path: 'ranking-ideas',
                component: RankingIdeasComponent
            },
            {
                path: 'campaigns',
                component: CampaignsComponent,
            },
            {
                path: '**',
                redirectTo: 'ideas-center'
            }
        ]
    }
];
