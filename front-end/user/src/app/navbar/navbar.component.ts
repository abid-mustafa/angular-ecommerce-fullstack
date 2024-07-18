import { NotificationService } from '../services/notification.service';
import { CartService } from '../services/cart.service';
import { DisplayService } from '../services/display.service';
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  username: any;
  quantity = 0;

  constructor(private userService: UserService, private router: Router, private displayService: DisplayService, private cartService: CartService, private notificationService: NotificationService) { }

  ngOnInit() {
    if (localStorage.getItem('username')) {
      this.username = JSON.parse(localStorage.getItem('username') || '');
    }
    const quantityObserver = this.cartService.getQuantityObservable();

    quantityObserver.subscribe(data => {
      this.quantity = data;
    });
  }

  updateCart() {
    let showCart: boolean = JSON.parse(localStorage.getItem('showCart') || '0');
    showCart = !showCart;
    localStorage.setItem('showCart', JSON.stringify(showCart));

    this.displayService.emitCartEvent();
  }

  async logOut() {
    // call logout API
    const response = await this.userService.logout();

    // if logout successful, hide navbar, clear local storage and go to login
    if (response.success) {
      this.cartService.clear();
      localStorage.clear();
      this.displayService.emitLogoutEvent();
      this.router.navigate(['login']);
    }
    else {
      // alert('An error occured while logging out.')
      this.notificationService.emitErrorEvent('An error occured while logging out.', '');
    }
  }

}
