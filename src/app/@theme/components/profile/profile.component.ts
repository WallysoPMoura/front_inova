import { Component } from '@angular/core';
import { AuthService } from '../../../@core/services/auth.service';

@Component({
  selector: 'inova-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(public authService: AuthService) {}

  get avatarIcon(): string {
    const name = this.authService.user.name?.replace(' ', '+');
    return `https://ui-avatars.com/api/name=${name}?rounded=true&background=ef892a&color=fff`;
  }

  get tags() {
    return ['Colaboradora', 'Inovadora', 'Participativa']
  }

}
