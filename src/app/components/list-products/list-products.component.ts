import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product/product.service'
import { Product } from '../../models/product/product'
import { Router } from '@angular/router';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Category } from 'src/app/models/category/category';
import { User } from 'src/app/models/user/user';
import { CategoryService } from 'src/app/services/category/category.service';
import { UserService } from 'src/app/services/user/user.service';
import { GlobalConstants } from 'src/app/global-constants';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css', '../../../table-styles.css']
})
export class ListProductsComponent {

  products: Product[];
  dataSource: MatTableDataSource<Product>;

  categories: Category[];
  sellers: User[];

  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  admin: boolean = false;
  user: boolean = false;

  displayedColumns: string[] = ['productId', 'categoryName', 'sellerName', 'productName', 'productDesc', 'productFeatures', 'productYOM', 'edit', 'delete'];


  id: number;

  apiUrl: string = GlobalConstants.apiURL;

  @ViewChild(MatPaginator, { static: true }) paginator: MatTableDataSourcePaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _productService: ProductService, private _router: Router, private _categoryService: CategoryService, private _userService: UserService) {
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
      this._productService.listProducts().subscribe((data: Product[]) => {

        this.products = data;
        this.dataSource = new MatTableDataSource<Product>(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
        (error) => {
          alert('An error occurred while fetching products: ' + error);
        });

      this._categoryService.listCategories().subscribe((data: Category[]) => {

        this.categories = data;

      },
        (error) => {
          alert('An error occurred while fetching categories: ' + error);
        });


      this._userService.listSellers().subscribe((data: User[]) => {

        this.sellers = data;
      },
        (error) => {
          alert('An error occurred while fetching sellers: ' + error);
        });
    }
    else if (this.user) {
      const userId = parseInt(JSON.parse(localStorage.getItem('user'))?.userId || '');
      console.log(userId);
      this._productService.listUserProducts(userId).subscribe((data: Product[]) => {

        this.products = data;
        this.dataSource = new MatTableDataSource<Product>(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
        (error) => {
          alert('An error occurred while fetching products: ' + error);
        });

      this._categoryService.listCategories().subscribe((data: Category[]) => {

        this.categories = data;

      },
        (error) => {
          alert('An error occurred while fetching categories: ' + error);
        });


      this._userService.listSellers().subscribe((data: User[]) => {

        this.sellers = data;
      },
        (error) => {
          alert('An error occurred while fetching sellers: ' + error);
        });
    }
  }

  private clearUserType() {

    this.admin = false;
    this.user = false;

  }

  filterChange(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories?.find(c => c.categoryId === categoryId);
    return category ? category.categoryName : '';
  }

  getSellerName(sellerId: number): string {
    const seller = this.sellers?.find(s => s.userId === sellerId);
    return seller ? seller.firstName + ' ' + seller.lastName : '';
  }

  deleteProduct(product: Product): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this._productService.deleteProduct(product).subscribe((success: boolean) => {
        if (success) {
          this.products = this.products.filter(u => u !== product);
          if (this.admin) {
            this._router.navigate(['/admin-dashboard/list-products']);
          } else if (this.user) {
            this._router.navigate(['/seller-dashboard/list-products']);
          }
        } else {
          alert('An error occurred');
        }
      },
        (error) => {
          console.error('Error while deleting the product:', error);
          alert('An error occurred' + error.error.message);
        });
    }
  }

  editProduct(product: Product) {
    this.id = product.productId;
    if (this.admin) {
      this._router.navigate(['/admin-dashboard/edit-product/' + this.id]);
    } else if (this.user) {
      this._router.navigate(['/seller-dashboard/edit-product/' + this.id]);
    }
  }

}
