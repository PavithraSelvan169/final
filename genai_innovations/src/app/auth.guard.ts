import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  //   if (this.authService.isLoggedIn()) {
  //     // User is logged in, redirect them away from the login page
  //     return this.router.createUrlTree(['/dashboard']);
  //   } else {
  //     // User is not logged in, allow them to access the login page
  //     return true;
  //   }
  // }

  canActivate(): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true; // allow dashboard
    }

    return this.router.createUrlTree(['/login']); // block + redirect
  }
}
