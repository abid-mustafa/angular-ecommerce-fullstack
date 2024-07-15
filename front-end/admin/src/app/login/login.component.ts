import { Component} from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

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
      
      this.router.navigate(['chats']);
    }
    else {
      // if login failed, show notification
      // this.toastr.error('Bad Credentials', '', { extendedTimeOut: 2000, timeOut: 2000 });
      alert('Bad credentials');
    }
  }
}
