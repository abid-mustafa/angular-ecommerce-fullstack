import { OrderService } from './../services/order.services';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  shoppingCart: any;
  total: number = 0;

  constructor(private router: Router, private orderService: OrderService, private toastr: ToastrService) { }

  ngOnInit() {
    this.shoppingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.total = JSON.parse(localStorage.getItem('total') || '0')
  }

  decrease(product: any) {

    for (let i = 0; i < this.shoppingCart.length; i++) {
      const element = this.shoppingCart[i];

      if (element.product.id === product.product.id) {
        this.total -= element.product.price;
        element.quantity -= 1;
        localStorage.setItem('total', JSON.stringify(this.total));

        if (element.quantity === 0) {
          this.shoppingCart.splice(i, 1);
        }
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.shoppingCart));
  }

  async increase(product: any) {
    const stockQuantity = await this.orderService.getQuantity(product.product.id);

    if (stockQuantity === 0) {
      this.toastr.warning(product.product.name + ' out of stock', '', { extendedTimeOut: 2000, timeOut: 2000 });
      return;
    }

    this.shoppingCart  = this.shoppingCart.map((item:any) => {
      if (item.product.id === product.product.id) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
    
    this.total = this.shoppingCart.reduce((sum:number, item:any) => sum + item.product.price * item.quantity, 0);
    
    localStorage.setItem('total', JSON.stringify(this.total));
    localStorage.setItem('cart', JSON.stringify(this.shoppingCart));
  }

  goToCheckout() {
    localStorage.setItem('total', JSON.stringify(this.total));
    this.router.navigate(['check-out']);
  }
}
