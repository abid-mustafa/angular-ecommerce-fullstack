import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatomoTracker } from 'ngx-matomo-client';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup
  private readonly tracker = inject(MatomoTracker);

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    // if user data in local storage, assume user logged in, reroute to products page
    if (localStorage.getItem('username') && localStorage.getItem('userid')) {
      this.router.navigate(['products']);
    }

    // inittialize login form
    this.loginForm = this.fb.group({
      name: '',
      password: ''
    });
  }

  async login() {
    const data = this.loginForm.value;

    // call login API
    const response = await this.userService.login(data);

    // if login successful
    if (response.success) {
      // store user data in local storage
      localStorage.setItem('userid', JSON.stringify(response.data.userid));
      localStorage.setItem('username', JSON.stringify(response.data.username));

      this.loginForm.reset();
      
      // Track the login event in Matomo
      this.tracker.setUserId(response.data.username);
      this.tracker.trackEvent('User', 'Login', 'login', 100);

      this.router.navigate(['products']);
    }
    else {
      // if login failed, show notification
      this.toastr.error('Bad Credentials', '', { extendedTimeOut: 2000, timeOut: 2000 });
    }
  }
}
