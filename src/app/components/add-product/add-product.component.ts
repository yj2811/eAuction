import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product/product.service'
import { Product } from '../../models/product/product'
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { GlobalConstants } from 'src/app/global-constants';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css', '../../../form-styles.css']
})

export class AddProductComponent {

  addProductForm: FormGroup;

  categories: Category[];
  sellers: User[];

  selectedFile: File;
  allFiles: File[] = [];

  allFilesNames: string[] = [];

  admin: boolean = false;
  user: boolean = false;

  apiUrl: string = GlobalConstants.apiURL;

  constructor(private _formBuilder: FormBuilder, private _productService: ProductService, private _router: Router, private _categoryService: CategoryService, private _userService: UserService, private _http: HttpClient) {
    _userService.isLoggedIn.subscribe(status => this.clearUserType());
  }

  ngOnInit() {
    const role = localStorage.getItem('role');
    if (role == 'admin') {
      this.admin = true;
    } else {
      this.user = true;
    }

    if (this.admin) {
      this.addProductForm = this._formBuilder.group({
        categoryId: [''],
        sellerId: ['', Validators.required],
        productName: ['', [Validators.required, Validators.maxLength(255)]],
        productDesc: ['', [Validators.required, Validators.maxLength(65535)]],
        productFeatures: ['', [Validators.required, Validators.maxLength(65535)]],
        productYOM: [null, [Validators.required, Validators.pattern(/^(19|20)\d{2}$/)]],
        productImage: ['']
      });

      this._categoryService.listCategories().subscribe(
        (data: Category[]) => {
          this.categories = data;
        },
        (error) => {
          alert('An error occurred while fetching categories: ' + error);
        }
      );

      this._userService.listSellers().subscribe(
        (data: User[]) => {
          this.sellers = data;
        },
        (error) => {
          alert('An error occurred while fetching sellers: ' + error);
        }
      );
    } else if (this.user) {
      this.addProductForm = this._formBuilder.group({
        categoryId: [''],
        // sellerId: [parseInt(JSON.parse(localStorage.getItem('user'))['userId']), Validators.required],
        sellerId: [parseInt(JSON.parse(localStorage.getItem('user'))?.userId || ''), Validators.required],
        productName: ['', [Validators.required, Validators.maxLength(255)]],
        productDesc: ['', [Validators.required, Validators.maxLength(65535)]],
        productFeatures: ['', [Validators.required, Validators.maxLength(65535)]],
        productYOM: [null, [Validators.required, Validators.pattern(/^(19|20)\d{2}$/)]],
        productImage: ['']
      });

      this._categoryService.listApprovedCategories().subscribe(
        (data: Category[]) => {
          this.categories = data;
        },
        (error) => {
          alert('An error occurred while fetching categories: ' + error);
        }
      );
    }
  }

  private clearUserType() {
    this.admin = false;
    this.user = false;
  }

  // onFileSelect(event) {
  //   this.selectedFile = event.target.files[0];
  //   this.fileName = new Date().getTime() + '-' + this.selectedFile.name;
  // }

  onFileSelect(event) {
    console.log(event.target.files.length);
    // for(let i=0; i<(event.target.files.length); i++) {

    //   this.selectedFile = event.target.files[i];
    //   console.log(this.selectedFile);
    //   this.allFiles.push(this.selectedFile);
    //   console.log(this.allFiles);

    // }
    // this.allFilesNames = this.allFiles.map(file => {
    //   const uuid = uuidv4();
    //   const ext = file.name.split('.').pop();
    //   return `${uuid}.${ext}`;
    // });
    // console.log(this.allFilesNames);

    for(let i=0; i<(event.target.files.length); i++) {
      this.selectedFile = event.target.files[i];
      const uniqueId = uuidv4();
      const modifiedFileName = `${this.selectedFile.name}_${uniqueId}`;
      const modifiedFile = new File([this.selectedFile], modifiedFileName, { type: this.selectedFile.type });
      this.allFiles.push(modifiedFile);
      console.log(this.allFiles);
    }
    this.allFilesNames = this.allFiles.map(file => file.name);
  }

  addProduct() {
    // if (this.selectedFile) {
    //   this.uploadImg();
    //   console.log(this.fileName);
    //   this.addProductForm.get('productImage').setValue(this.fileName);
    //   console.log(this.addProductForm.value);
    // }

    if (this.allFiles) {
      this.uploadImg();
      const fileNames = this.allFilesNames.join(',');
      this.addProductForm.get('productImage').setValue(fileNames);
      console.log(this.addProductForm.value);
    }

    if (confirm('Are you sure you want to add this product?')) {
      this._productService.addProduct(this.addProductForm.value).subscribe((success: boolean) => {
        if (success) {
          if (this.admin) {
            this._router.navigate(['/admin-dashboard/list-products']);
          } else if (this.user) {
            this._router.navigate(['/seller-dashboard/list-products']);
          }
        } else {
          alert('An error occurred while adding the product');
        }
      },
        (error) => {
          alert('An error occurred while adding the product: ' + error.error.message);
        }
      );

    }
  }

  uploadImg() {
    // const uploadData = new FormData();
    // uploadData.append("imgToUpload", this.selectedFile, this.fileName);
    // console.log(uploadData.get('imgToUpload'));

    const uploadData = new FormData();
    for(let i=0; i<this.allFiles.length; i++) {
      uploadData.append("imgToUpload[]", this.allFiles[i]);
    }

    console.log(uploadData.get('imgToUpload[]'));

    this._http.post(`${this.apiUrl}/image/upload-image.php`, uploadData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(
      (event) => {
        console.log(event);
        if (event.type === HttpEventType.Response) {
          const response: any = event.body;
          if (response.success) {
            console.log(response.data);
          } else {
            alert(response.message);
          }
        }
      }
      ,
      (error) => {
        alert('An error occurred while uploading: ' + error.message);
      }
    );
  }

}

