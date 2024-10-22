import { Component, Input } from '@angular/core';
import { BannerType } from '../../../@core/types/banner.type';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';
import { Campaign } from '../../../@core/types/campaign.type';
import { AuthService } from '../../../@core/services/auth.service';

@Component({
  selector: 'inova-banner',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

  @Input() campaign?: Campaign;
  @Input() type: BannerType = 'center';

  constructor(public authService: AuthService) {}

}
