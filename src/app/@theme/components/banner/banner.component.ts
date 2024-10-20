import { Component, Input } from '@angular/core';
import { BannerType } from '../../../@core/types/banner.type';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';
import { Campaign } from '../../../@core/types/campaign.type';

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
  // @Input() title?: string = 'Sustentabilidade';
  // @Input() subtitle?: string = 'Construa o futuro da empresa';
  // @Input() campaignUrl?: string;

}
