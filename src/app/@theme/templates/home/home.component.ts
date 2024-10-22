import { AfterViewInit, Component, ContentChild, ElementRef, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { AuthService } from '../../../@core/services/auth.service';
import { AvatarItem } from '../../../@core/types/avatar.type';

@Component({
  selector: 'inova-home-template',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    AvatarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngAfterViewInit(): void {}

  logout(event: AvatarItem) {

    if (event.value == 'logout') {

      this.authService.logout().subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
        }
      })

    }
  }

}
