import { CartService } from './../services/cart.service';
import { OrderService } from './../services/order.services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})

export class ProductComponent implements OnInit {
  products: any;
  searchText = '';
  noProducts = false;

  constructor(private router: Router, private productService: ProductService, private orderService: OrderService, private cartService: CartService, private notificationService: NotificationService) { }

  async ngOnInit() {
    // API call to get Products
    const response = await this.productService.getProducts();

    if (response.success) {
      this.products = response.data;
      // store products in local storage
      localStorage.setItem('products', JSON.stringify(this.products));
      // set boolean variable to hide/show the no products text
      this.noProducts = !this.products.length;
    }
    else {
      this.notificationService.toaster('error', 'Please try again later', response.message, 2000);
    }
  }

  async addToCart(product: Product) {

    const quantity = await this.orderService.getQuantity(product.id);

    if (quantity > 0) {
      this.cartService.increaseQuantity(product);
      this.cartService.emitEvent();
      this.cartService.emitQuantityEvent();
      this.notificationService.toaster('success', '', product.name + ' added to cart', 1000);
    }
    else {
      this.notificationService.toaster('warning', '', product.name + ' is out of stock', 1000);
    }
  }
}
