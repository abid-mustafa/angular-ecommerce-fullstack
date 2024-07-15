import { OrderService } from './../services/order.services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit {
  products: any;
  searchText = '';
  noProducts = false;

  constructor(private router: Router, private productService: ProductService, private orderService: OrderService, private toastr: ToastrService) { }

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
      this.toastr.error('Please try again later', response.message, { extendedTimeOut: 2000, timeOut: 2000 });
    }
  }

  async addToCart(product: any) {
    const stockQuantity = await this.orderService.getQuantity(product.id);

    if (stockQuantity === 0) {
      this.toastr.warning(product.name + ' out of stock', '', { extendedTimeOut: 2000, timeOut: 2000 });
      return;
    }

    // object to product and quantity
    // const obj = {
    //   product,
    //   quantity: 1
    // }

    console.log(product.id);
    

    product.quantity = 1;

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // boolean to check if object already in cart
    let exists = false;

    for (let element of cart) {
      // if object in cart
      if (element.id === product.id) {
        // set exists to true and increment quantity
        exists = true;
        element.quantity += 1;
        break;
      }
    }

    // if not exists, push into cart
    if (!exists) {
      cart.push(product);
    }

    // get total from local storage and add price of product
    let total = JSON.parse(localStorage.getItem('total') || '0');
    total += product.price;
    localStorage.setItem('total', JSON.stringify(total));

    // update cart and give notification
    localStorage.setItem('cart', JSON.stringify(cart));
    this.toastr.success(product.name + ' added to cart', '', { extendedTimeOut: 1000, timeOut: 1000 });
  }
}
