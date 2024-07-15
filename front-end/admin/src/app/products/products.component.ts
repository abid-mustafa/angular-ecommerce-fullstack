import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductComponent {
  products: any;
  noProducts = false;

  constructor(private router: Router, private productService: ProductService) { }

  async ngOnInit() {
    const response = await this.productService.getProducts();
    if (response.success) {
      this.products = response.data;
      this.noProducts = !this.products.length;
      console.log(this.products);
      
    }
    else {
      console.log('error getting products');
    }
  }
}
