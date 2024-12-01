import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  Math = Math;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    /**
     * Inject the AuthService here
     */
    private readonly authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // remove auth_token and user_data from localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // Redirect to a different page after successful login
          if(this.authService.isAdmin()) {
            this.router.navigate(['/admin']);
          }

          else if(this.authService.isAuthenticated()) {
            this.router.navigate(['/portal']);
          }

        },
        error: (err) => {
          console.error('Login failed:', err);
          this.errorMessage = 'Invalid email or password. Please try again.';
        }
      });
    }
  }

  closeLogin() {
    this.router.navigate(['']);
  }
}
