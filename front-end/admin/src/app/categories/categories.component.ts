import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoryComponent {
  categories: any[] = []
  displayedColumns: string[] = ['name', 'description'];
  categoryForm!: FormGroup

  // Form stats
  success = false

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.categoryForm = this.fb.group({
      name: '',
      description: ''
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

  async addCategory() {
    console.log('add category clicked');
    console.log(this.categoryForm.value);

    let data = this.categoryForm.value

    const response = await this.categoryService.addCategory(data);

    if (response.success) {
      alert('category added successfuly')
    }
    else {
      alert('error while adding category')
    }
  }
}
