import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HomeComponent as HomeTemplate } from '../@theme/templates/home/home.component';

@Component({
  selector: 'inova-home',
  standalone: true,
  imports: [RouterOutlet, HomeTemplate],
  template: `
    <inova-home-template>
        <router-outlet />
    </inova-home-template>
  `,
})
export class HomeComponent { }
