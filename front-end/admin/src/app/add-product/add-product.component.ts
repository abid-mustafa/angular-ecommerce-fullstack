import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { insertProduct } from '../services/products.service';
import { getCategories } from '../services/categories.service';
import { category } from '../category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  title = "Add a Product"
  productForm!: FormGroup
  categories: category[] = []

  // Form stats
  success = false

  constructor(private fb: FormBuilder, private router: Router) {
    this.productForm = this.fb.group({
        name: '',
        description: '',
        price: '',
        categoryId:''
    })
  }

  async ngOnInit() {
    this.categories = await getCategories();
 }
      
  async addProduct() {

      console.log('in add items')
      console.log(this.productForm.value)

      let data = this.productForm.value
      
      this.success = await insertProduct(data.name.trim(), data.description.trim(), data.price, data.categoryId);

      if (this.success){
        this.productForm.reset();
        alert('product added successfuly');
      }
      else
        alert('product not added successfuly');
      this.router.navigate(['/products']);
  }
}
