import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../services/categories.service';
import { ProductService } from '../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  title = "Add a Product";
  productForm!: FormGroup;
  categories: any[] = [];

  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService, private categoryService: CategoryService) {
    this.productForm = this.fb.group({
      name: '',
      description: '',
      price: '',
      image: '',
      quantity: '',
      categoryId: ''
    })
  }

  async ngOnInit() {
    const response = await this.categoryService.getCategories();
    if (response.success) {
      this.categories = response.data;
    }
    else {
      console.log('error getting products');
    }
  }

  async addProduct() {

    console.log('in add items');
    console.log(this.productForm.value);

    const data = this.productForm.value;
    console.log(data);

    const response = await this.productService.addProduct(data);

    if (response.success) {
      this.productForm.reset();
      alert('product added successfully');
    }
    else
      alert('product not added successfuly');
    this.router.navigate(['/products']);
  }
}
