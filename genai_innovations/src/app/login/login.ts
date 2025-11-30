import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  form: FormGroup;
  error = '';
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) {

    this.fb = fb;

    this.form = this.fb.group({
      username: '',
      password: ''
    });



    // if (this.auth.isLoggedIn()) {
    //   this.router.navigate(['/dashboard']);
    // }
  }

  ngOnInit(): void {
    // Check login status after component initialization
    // if (this.auth.isLoggedIn()) {
    //   this.router.navigate(['/dashboard']);
    // }
  }


  submit() {
    const { username, password } = this.form.value;

    this.auth.login(username!, password!).subscribe({
      // next: _ => this.router.navigate(['/dashboard']),
      // error: _ => this.error = 'Invalid credentials'

      next: () => {
      console.log('Login success');
      // this.router.navigate(['/dashboard']);
      window.location.href = '/dashboard';
    },
    error: (err) => {
      console.error('Login error', err);
      this.error = 'Login failed';
    }
    });
  }
}
