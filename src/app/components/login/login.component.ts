import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  showLoginForm: boolean = false;
  loginUserType: 'mentor' | 'intern' = 'mentor';

  constructor(private router: Router) {}

  openLoginModal(userType: 'mentor' | 'intern') {
    this.loginUserType = userType;
    this.showLoginForm = true;
  }

  closeLoginModal() {
    this.showLoginForm = false;
  }
}
