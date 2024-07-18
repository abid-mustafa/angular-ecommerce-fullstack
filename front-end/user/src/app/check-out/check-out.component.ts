import { DisplayService } from './../services/display.service';
import { NotificationService } from '../services/notification.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { v4 } from 'uuid';
import { OrderService } from '../services/order.services';
import { MatomoTracker } from 'ngx-matomo-client';
import { CartItem } from '../models/cart-item.model';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent {
  checkoutForm!: FormGroup;
  shoppingCart: CartItem[] = [];
  total: any;
  orderNumber: any;

  constructor(private fb: FormBuilder, private router: Router, private cartService: CartService, private orderService: OrderService, private tracker: MatomoTracker, private notificationService: NotificationService, private displayService: DisplayService) { }

  ngOnInit() {
    // initialize checkOut form
    this.checkoutForm = this.fb.group({
      email: '',
      address: '',
      contact: ''
    });

    // get order data from local storage
    this.shoppingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.total = JSON.parse(localStorage.getItem('total') || '0');

    const cartObservable = this.cartService.getCartObservable();

    cartObservable.subscribe((data: any) => {
      this.total = data.total;
      this.shoppingCart = data.cart;
    });

    // if order number not in local storage, call v4() to set orderNumber and store in localStorage
    if (!localStorage.getItem('orderNumber')) {
      this.orderNumber = v4();
      localStorage.setItem('orderNumber', this.orderNumber);
    }
    // else retrieve orderNumber from localStorage
    else {
      this.orderNumber = localStorage.getItem('orderNumber');
    }
  }

  async checkOut() {
    const orderLines: any = [];

    const formData = this.checkoutForm.value;
    const customerId = JSON.parse(localStorage.getItem('userid') || '0');

    this.shoppingCart.forEach((element: any) => {
      // calculate subtotal for each row
      const subtotal = element.quantity * element.price;

      // add orderLine data of each row
      orderLines.push({
        productId: element.id,
        quantity: element.quantity,
        unitPrice: element.price,
        subtotal
      });
    });

    // create object to store all the order data
    const data = {
      customerId,
      total: this.total,
      orderNumber: this.orderNumber,
      email: formData.email.trim(),
      address: formData.address.trim(),
      contact: formData.contact.trim(),
      orderLines
    }

    // call addOrder API
    const response = await this.orderService.addOrder(data);

    // if adding order successful
    if (response.success) {
      // Initialize Matomo Ecommerce Order with all the rows
      this.shoppingCart.forEach((element: any) => {
        this.tracker.addEcommerceItem(
          element.id.toString(),
          element.name,
          element.categoryName,
          element.price,
          element.quantity
        );
      });

      // Track the eCommerce order
      this.tracker.trackEcommerceOrder(this.orderNumber, this.total);

      // clear local storage and reset form
      localStorage.removeItem('cart');
      localStorage.removeItem('total');
      localStorage.removeItem('orderNumber');
      this.cartService.clear();
      this.cartService.emitQuantityEvent();
      this.checkoutForm.reset();

      // give success notification and reroute to history page
      await this.notificationService.toaster('success', 'Order placed successfully', '', 2000);

      localStorage.setItem('showCart', JSON.stringify(false));

      this.displayService.emitCartEvent();
      this.cartService.clear();
      this.cartService.emitEvent();

      this.router.navigate(['history']);
    }
    else {
      const outOfStock = response.data;

      // give out of stock notification
      for (let name of outOfStock) {
        this.notificationService.toaster('warning', name + ' is out of stock', '', 1000);
      }
    }
  }
}
