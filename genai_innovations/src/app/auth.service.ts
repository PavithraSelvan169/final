// src/app/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  private API = '/api/auth/login';
  private TOKEN_KEY = 'access_token';

  login(username: string, password: string) {
    return this.http.post<{access_token:string}>(this.API, { username, password })
      .pipe(map(res => {
        localStorage.setItem(this.TOKEN_KEY, res.access_token);
        return true;
      }));
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }


}
