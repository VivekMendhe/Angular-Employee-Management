import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  @Input() userType: 'mentor' | 'intern' = 'mentor';
  @Output() close = new EventEmitter<void>();

  username: string = '';
  password: string = '';
  passwordVisible: boolean = false;

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  onSubmit() {
    if (
      this.userType === 'mentor' &&
      this.username === 'mentor' &&
      this.password === 'mentor'
    ) {
      this.router.navigate(['mentor/batches']);
    } else if (
      this.userType === 'intern' &&
      this.username === 'intern' &&
      this.password === 'intern'
    ) {
      this.router.navigate(['/intern/dashboard']);
    } else {
      alert('Invalid credentials');
    }
    this.close.emit();
  }
}
