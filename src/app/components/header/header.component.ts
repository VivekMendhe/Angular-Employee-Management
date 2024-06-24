import { Component } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMentor = false;
  isIntern = false;
  showHomeLink = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateHeader();
      }
    });
  }

  updateHeader() {
    const currentUrl = this.router.url;
    this.showHomeLink = currentUrl === '/';
    if (currentUrl.includes('/mentor')) {
      this.isMentor = true;
      this.isIntern = false;
    } else if (currentUrl.includes('/intern')) {
      this.isMentor = false;
      this.isIntern = true;
    } else {
      this.isMentor = false;
      this.isIntern = false;
    }
  }
}
