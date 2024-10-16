import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthComponent as AuthTemplate } from '../@theme/templates/auth/auth.component';

@Component({
  selector: 'inova-auth',
  standalone: true,
  imports: [RouterOutlet, AuthTemplate],
  template: `
    <inova-auth-template>
        <router-outlet />
    </inova-auth-template>
  `,
})
export class AuthComponent { }
