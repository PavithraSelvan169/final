import { Routes } from '@angular/router';
import {Login} from './login/login';
import {Dashboard} from './dashboard/dashboard';
import {Summary} from './summary/summary';
import {Reports} from './reports/reports';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard'

export const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'login', component: Login, canActivate: [LoginGuard]},
    {path: 'dashboard', component: Dashboard, canActivate: [AuthGuard]},
    {path: 'summary', component: Summary, canActivate: [AuthGuard]},
    {path: 'reports', component: Reports, canActivate: [AuthGuard]},

    // All others
    {path: '**', redirectTo: '/dashboard'}
];
