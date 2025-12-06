import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from './environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private API = `${environment.api_host}/login`;
  private TOKEN_KEY = 'access_token';

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(username: string, password: string) {
    console.log('entered login function')
    return this.http.post<{ access_token: string }>(this.API, { username, password })
      .pipe(map(res => {
        console.log('API response:', res);

        if (isPlatformBrowser(this.platformId)) {
          console.log('Saving to localStorage...');
          localStorage.setItem(this.TOKEN_KEY, res.access_token);
          console.log('STORED TOKEN:', localStorage.getItem(this.TOKEN_KEY));
        } else {
          console.warn('Not in browser - skipping localStorage');
        }

        return true;
      }));
  }


  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser()) return false;
    const token = localStorage.getItem('access_token');
    return !!token && !this.isTokenExpired(token);
    // return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }
  getUsername(): string | null {
    if (!this.isBrowser()) return null;
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    return decoded.fullname || null;
  }

  isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  }


}

