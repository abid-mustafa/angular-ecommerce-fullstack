import { category } from './../category';
import { Component } from '@angular/core';
import { getCategories, insertCategory } from '../services/categories.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoryComponent {
  categories: category[] = []
  displayedColumns: string[] = ['name', 'description'];
  categoryForm! : FormGroup

  // Form stats
  success = false

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: '',
      description: ''
  })
  }

  async ngOnInit() {
    this.categories = await getCategories();

  }

  async addCategory() {
    console.log('add category clicked');
    console.log(this.categoryForm.value);
    
    let data = this.categoryForm.value
      
      this.success = await insertCategory(data.name.trim(), data.description.trim());

      if (this.success){
        this.categoryForm.reset();
        alert('category added successfuly');
      }
      else
        alert('category not added successfuly');
  }
}
