import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product/product.service'
import { Product } from '../../models/product/product'
import { Router, Params, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css', '../../../form-styles.css']
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup;

  admin: boolean = false;
  user: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _productService: ProductService, private _userService: UserService, private _router: Router, private _route: ActivatedRoute) {
    _userService.isLoggedIn.subscribe(status => this.clearUserType());
  }

  ngOnInit() {
    const role = localStorage.getItem('role');
    if (role == 'admin') {
      this.admin = true;
    } else {
      this.user = true;
    }

    this.editProductForm = this._formBuilder.group({
      productId: ['', Validators.required],
      productName: ['', [Validators.required, Validators.maxLength(255)]],
      productDesc: ['', [Validators.required, Validators.maxLength(65535)]],
      productFeatures: ['', [Validators.required, Validators.maxLength(65535)]],
      productYOM: [null, [Validators.required, Validators.pattern(/^(19|20)\d{2}$/)]]
    });

    const routeParams = this._route.snapshot.params;

    this._productService.getProductById(routeParams['id']).subscribe(
      (data: Product[]) => {

        this.editProductForm.patchValue(data);

      },
      (error) => {
        console.error('Error retrieving product details:', error.error.message);
      }
    );
  }

  private clearUserType() {
    this.admin = false;
    this.user = false;
  }

  editProduct() {
    if (confirm('Are you sure you want to edit this product?')) {
      this._productService.editProduct(this.editProductForm.value).subscribe((success: boolean) => {
        if (success) {
          if (this.admin) {
            this._router.navigate(['/admin-dashboard/list-products']);
          } else if (this.user) {
            this._router.navigate(['/seller-dashboard/list-products']);
          }
        } else {
          alert('An error occurred while editing the product');
        }
      },
        (error) => {
          alert('An error occurred while editing the product: ' + error.error.message);
        }
      );

    }
  }

}
