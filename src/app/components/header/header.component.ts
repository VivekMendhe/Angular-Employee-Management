import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  showLogoutButton = true;

  constructor(private router: Router, private snackBar: MatSnackBar) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateHeader();
      }
    });
  }

  updateHeader() {
    const currentUrl = this.router.url;
    this.showHomeLink = currentUrl === '/';
    this.showLogoutButton = !currentUrl.includes('/login');
    if (currentUrl.includes('/mentor')) {
      this.isMentor = true;
      this.isIntern = false;
    } else if (currentUrl.includes('/intern')) {
      this.isMentor = false;
      this.isIntern = true;
    } else {
      this.isMentor = false;
      this.isIntern = false;
      this.showLogoutButton = false;
    }
  }

  logout() {
    this.isMentor = false;
    this.isIntern = false;
    this.showLogoutButton = false;
    this.router.navigate(['/']);
    this.showToast('Logged out successfully');
  }

  showToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
