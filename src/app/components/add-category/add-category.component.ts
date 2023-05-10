import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { Router } from '@angular/router';
import { CategoryResponse } from 'src/app/models/category/category';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css', '../../../form-styles.css']
})
export class AddCategoryComponent {
  addCategoryForm: FormGroup;

  admin: boolean = false;
  user: boolean = false;

  constructor(private _formBuilder : FormBuilder, private _categoryService : CategoryService, private _router : Router, private _userService: UserService) {
    _userService.isLoggedIn.subscribe(status => this.clearUserType());
  }

  ngOnInit() {

    const role = localStorage.getItem('role');
    if (role == 'admin') {
      this.admin = true;
    } else {
      this.user = true;
    }

    this.addCategoryForm = this._formBuilder.group({
      categoryName: ['', [Validators.required, Validators.maxLength(40)]],
    });
  }

  private clearUserType() {

    this.admin = false;
    this.user = false;

  }

  addCategory() {
    if (confirm('Are you sure you want to add this category?')) {
      this._categoryService.addCategory(this.addCategoryForm.value).subscribe((success: boolean) => {
        if (success) {
          if (this.admin) {
            this._router.navigate(['/admin-dashboard/list-categories']);
          } else if (this.user) {
            this._router.navigate(['/seller-dashboard/list-categories']);
          }
        } else {
          alert('An error occurred while adding the category');
        }
      },
      (error) => {
        alert('An error occurred while adding the category: ' + error.error.message);
      }
      );
    }
  }
}
