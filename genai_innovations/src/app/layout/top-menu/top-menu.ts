import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule} from '@angular/router'; 
import { CommonModule } from '@angular/common';
import {AuthService} from '../../auth.service'

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, RouterModule],
  templateUrl: './top-menu.html',
  styleUrl: './top-menu.css',
})
export class TopMenu {

  constructor(public auth: AuthService) {}

  
isLoggedIn() {
  return this.auth.isLoggedIn();
}

logout() {
  this.auth.logout();
}
  

}
