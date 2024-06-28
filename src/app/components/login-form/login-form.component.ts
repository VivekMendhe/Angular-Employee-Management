import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertModule } from '@coreui/angular';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, TitleCasePipe, AlertModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  @Input() userType: 'mentor' | 'intern' = 'mentor';
  @Output() close = new EventEmitter<void>();

  username: string = '';
  password: string = '';
  passwordVisible: boolean = false;

  constructor(private router: Router, private snackBar: MatSnackBar) {}

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
      this.showToast('Successfully logged in as mentor');
    } else if (
      this.userType === 'intern' &&
      this.username === 'intern' &&
      this.password === 'intern'
    ) {
      this.router.navigate(['/intern/dashboard']);
      this.showToast('Successfully logged in as intern');
    } else {
      alert('Invalid credentials');
    }
    this.close.emit();
  }

  showToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
