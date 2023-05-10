import { Component, ViewChild } from '@angular/core';
import { Category} from 'src/app/models/category/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { Router } from '@angular/router';
import { MatTableDataSourcePaginator, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StylesheetMap } from '@angular/flex-layout';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { Auction } from 'src/app/models/auction/auction';
import { AuctionService } from 'src/app/services/auction/auction.service';
import { Product } from 'src/app/models/product/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css', '../../../table-styles.css'],
})
export class RequestsComponent {
  //categories
  requestCategories: Category[];
  categoriesDataSource: any;

  categoriesDisplayedColumns: string[] = ['sNo', 'categoryId', 'categoryName', 'status', 'handleStatus'];

  @ViewChild(MatPaginator, {static: true}) categoriesPaginator: MatTableDataSourcePaginator;
  @ViewChild(MatSort, {static: true}) categoriesSort: MatSort;

  //users
  requestUsers: User[];
  usersDataSource: any;

  usersDisplayedColumns: string[] = ['sNo', 'userId', 'role', 'userName', 'status', 'handleStatus'];

  @ViewChild(MatPaginator, {static: true}) usersPaginator: MatTableDataSourcePaginator;
  @ViewChild(MatSort, {static: true}) usersSort: MatSort;

  //auctions
  requestAuctions: Auction[];
  auctionsDataSource: any;

  auctionsDisplayedColumns: string[] = ['sNo', 'auctionId', 'productName', 'startDate', 'endDate', 'startBidAmount', 'minIncrementValue', 'availableQty', 'status', 'handleStatus'];

  @ViewChild(MatPaginator, {static: true}) auctionsPaginator: MatTableDataSourcePaginator;
  @ViewChild(MatSort, {static: true}) auctionsSort: MatSort;

  products: Product[];

  id: number;

  constructor(private _categoryService: CategoryService, private _userService: UserService, private _auctionService: AuctionService, private _router: Router, private _productService: ProductService) {

  }

  ngOnInit() {
    this._categoryService.requestCategories().subscribe((data: Category[]) => {
      this.requestCategories = data;
      this.categoriesDataSource = new MatTableDataSource<Category>(this.requestCategories);
      this.categoriesDataSource.paginator = this.categoriesPaginator;
      this.categoriesDataSource.sort = this.categoriesSort;
    }, (error) => {
      alert('An error occurred' + error.error.message);
    });

    this._userService.requestUsers().subscribe((data: User[]) => {
      this.requestUsers = data;
      this.usersDataSource = new MatTableDataSource<User>(this.requestUsers);
      this.usersDataSource.paginator = this.usersPaginator;
      this.usersDataSource.sort = this.usersSort;
    }, (error) => {
      alert('An error occurred' + error.error.message);
    });

    this._auctionService.requestAuctions().subscribe((data: Auction[]) => {
      this.requestAuctions = data;
      this.auctionsDataSource = new MatTableDataSource<Auction>(this.requestAuctions);
      this.auctionsDataSource.paginator = this.auctionsPaginator;
      this.auctionsDataSource.sort = this.auctionsSort;
    }, (error) => {
      alert('An error occurred' + error.error.message);
    });

    this._productService.listProducts().subscribe((data: Product[]) => {
      this.products = data;

    }, (error) => {
      alert('An error occurred' + error.error.message);
    });

  }

  viewAuction(auction: Auction) {
    this.id = auction.auctionId;
    this._router.navigate(['/view-auction/' + this.id]);
  }

  categoriesFilterChange(event : Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categoriesDataSource.filter = filterValue;
  }

  usersFilterChange(event : Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersDataSource.filter = filterValue;
  }

  auctionsFilterChange(event : Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.auctionsDataSource.filter = filterValue;
  }

  getProductName(productId: number): string {
    const product = this.products?.find(p => p.productId === productId);
    return product ? product.productName : '';
  }

  approveCategory(element: Category) {
    if (confirm('Are you sure you want to approve this category?')) {
      this._categoryService.approveCategory(element).subscribe(
        (success: boolean) => {
          if (success) {
            element.status = 'approved';
            this._router.navigate(['/admin-dashboard/requests']);
          } else {
            alert('An error occurred');
          }
        },
        (error) => {
          console.error('Error while approving the category:', error);
          alert('An error occurred' + error.error.message);
        }
      );
    }
  }

  denyCategory(element: Category) {
    if (confirm('Are you sure you want to deny this category?')) {
      this._categoryService.denyCategory(element).subscribe(
        (success: boolean) => {
          if (success) {
            element.status = 'denied';
            this._router.navigate(['/admin-dashboard/requests']);
          } else {
            alert('An error occurred');
          }
        },
        (error) => {
          console.error('Error while denying the category:', error);
          alert('An error occurred' + error.error.message);
        }
      );
    }
  }


  approveUser(element: User) {
    if (confirm('Are you sure you want to approve this user?')) {
      this._userService.approveUser(element).subscribe(
        (success: boolean) => {
          if (success) {
            element.status = 'approved';
            this._router.navigate(['/admin-dashboard/requests']);
          } else {
            alert('An error occurred');
          }
        },
        (error) => {
          console.error('Error while approving the user:', error);
          alert('An error occurred' + error.error.message);
        }
      );
    }
  }

  denyUser(element: User) {
    if (confirm('Are you sure you want to deny this user?')) {
      this._userService.denyUser(element).subscribe(
        (success: boolean) => {
          if (success) {
            element.status = 'denied';
            this._router.navigate(['/admin-dashboard/requests']);
          } else {
            alert('An error occurred');
          }
        },
        (error) => {
          console.error('Error while denying the user:', error);
          alert('An error occurred'  + error.error.message);
        }
      );
    }
  }

  approveAuction(element: Auction) {
    if (confirm('Are you sure you want to approve this auction?')) {
      this._auctionService.approveAuction(element).subscribe(
        (success: boolean) => {
          if (success) {
            element.status = 'approved';
            this._router.navigate(['/admin-dashboard/requests']);
          } else {
            alert('An error occurred');
          }
        },
        (error) => {
          console.error('Error while approving the auction:', error);
          alert('An error occurred' + error.error.message);
        }
      );
    }
  }

  denyAuction(element: Auction) {
    if (confirm('Are you sure you want to deny this auction?')) {
      this._auctionService.denyAuction(element).subscribe(
        (success: boolean) => {
          if (success) {
            element.status = 'denied';
            this._router.navigate(['/admin-dashboard/requests']);
          } else {
            alert('An error occurred');
          }
        },
        (error) => {
          console.error('Error while denying the auction:', error);
          alert('An error occurred'  + error.error.message);
        }
      );
    }
  }


}
