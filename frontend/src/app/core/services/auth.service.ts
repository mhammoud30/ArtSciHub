import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, first, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../environments/environment.';

interface LoginResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.API_URL;
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Check for existing token and user data on service initialization
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    if (userData != undefined) {
      try {
        this.userSubject.next(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user_data'); // Optional: clear corrupted data
      }
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/auth/sign-in`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          // Save the access token
          localStorage.setItem('auth_token', response.accessToken);

          // Decode the token to extract user data
          const decodedToken: { sub: number; email: string; firstName: string, lastName: string , role: string } =
            jwtDecode(response.accessToken);

          // Extract only the required fields
          const userData = {
            id: decodedToken.sub,
            email: decodedToken.email,
            firstName: decodedToken.firstName,
            lastName: decodedToken.lastName,
            role: decodedToken.role,
          };

          // Save user data to localStorage
          localStorage.setItem('user_data', JSON.stringify(userData));

          // Update the userSubject with the current user data
          this.userSubject.next(userData);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  isAdmin(): boolean {
    const userData = this.userSubject.value;
    return userData?.role === 'admin';
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getCurrentUser(): any {
    return this.userSubject.value;
  }

  getBaseURL(): string {
    return this.API_URL;
  }
}
