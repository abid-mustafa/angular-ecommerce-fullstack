import { DisplayService } from '../services/display.service';
import { CartService } from '../services/cart.service';
import { OrderService } from './../services/order.services';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../models/cart-item.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent {
  shoppingCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  total: number = JSON.parse(localStorage.getItem('total') || '0');
  showCart = JSON.parse(localStorage.getItem('showCart') || '0');

  constructor(private router: Router, private cartService: CartService, private displayService: DisplayService, private orderService: OrderService, private toastr: ToastrService) { }

  ngOnInit() {
    const cartObservable = this.cartService.getCartObservable();

    cartObservable.subscribe((data: any) => {
      this.total = data.total;
      this.shoppingCart = data.cart;
    });

    this.displayService.getCartObservable().subscribe(data => this.showCart = data);
  }

  decrease(product: CartItem) {
    this.cartService.decreaseQuantity(product);
    this.cartService.emitEvent();
    this.cartService.emitQuantityEvent();
  }

  async increase(product: CartItem) {
    const quantity = await this.orderService.getQuantity(product.id);

    if (quantity > 0) {
      this.cartService.increaseQuantity(product);
      this.cartService.emitEvent();
      this.cartService.emitQuantityEvent();
    }
  }

  remove(product: CartItem) {
    this.cartService.removeFromCart(product);
    this.cartService.emitEvent();
    this.cartService.emitQuantityEvent();
  }

  goToCheckout() {
    localStorage.setItem('showCart', JSON.stringify(false));
    this.showCart = false;
    this.router.navigate(['check-out']);
  }
}
