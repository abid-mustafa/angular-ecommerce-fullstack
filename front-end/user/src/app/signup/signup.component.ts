import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatomoTracker } from 'ngx-matomo-client';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup
  private readonly tracker = inject(MatomoTracker);

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit() {
    if (localStorage.getItem('username') && localStorage.getItem('userid')) {
      this.router.navigate(['products']);
    }

    this.signupForm = this.fb.group({
      name: '',
      password: ''
    });
  }

  async signup() {
    const data = this.signupForm.value;

    data.name = data.name.trim();
    data.password = data.password.trim();

    const response = await this.userService.signup(data);

    if (response.success) {
      localStorage.setItem('userid', JSON.stringify(response.data.userid));
      localStorage.setItem('username', JSON.stringify(response.data.username));
      this.signupForm.reset();
      this.tracker.setUserId(response.data.username);
      // Track the singup event
      this.tracker.trackEvent('User', 'Signup', 'signup', 200);
      this.tracker.trackEvent('User', 'Login', 'login', 100);

      this.router.navigate(['products']);
    }
    else {
      this.notificationService.toaster('error', 'A user already exists with that username', '', 2000);
    }

  }
}
