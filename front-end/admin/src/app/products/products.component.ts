import { product } from '../product';
import { Component } from '@angular/core';
import { getProducts } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductComponent {
  products: product[] = []

  constructor(private router: Router) {

  }

  async ngOnInit() {
    this.products = await getProducts();
  }

  addProduct () {
    console.log('add clicked');
    this.router.navigate(['/add-product'])
  }
}
