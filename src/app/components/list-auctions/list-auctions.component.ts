import { Component, ViewChild } from '@angular/core';
import { Auction } from 'src/app/models/auction/auction';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AuctionService } from 'src/app/services/auction/auction.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { Product } from 'src/app/models/product/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-auctions',
  templateUrl: './list-auctions.component.html',
  styleUrls: ['./list-auctions.component.css', '../../../table-styles.css']
})
export class ListAuctionsComponent {
  auctions: Auction[];
  dataSource: MatTableDataSource<Auction>;

  admin: boolean = false;
  seller: boolean = false;
  buyer: boolean = false;

  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  displayedColumns: string[];

  id: number;

  products: Product[];

  state: string = '';
  stateSubscription: Subscription;

  @ViewChild(MatPaginator, { static: true }) paginator: MatTableDataSourcePaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _auctionService: AuctionService, private _router: Router, private _productService: ProductService, private _userService: UserService, private _route: ActivatedRoute) {
    _userService.isLoggedIn.subscribe(status => this.clearUserType());
    this.stateSubscription = this._route.paramMap.subscribe(params => {
      this.state = params.get('state');
      console.log(this.state);
      this.ngOnInit();
    });
  }

  ngOnInit() {

    const role = localStorage.getItem('role');
    if (role == 'admin') {
      this.admin = true;
    } else if (role == 'seller') {
      this.seller = true;
    } else if (role == 'buyer') {
      this.buyer = true;
    }

    if (this.state == 'live' || this.state == 'upcoming' || this.state == 'closed') {
      this._auctionService.listAuctionsWithState(this.state).subscribe((data: Auction[]) => {

        this.auctions = data;
        this.dataSource = new MatTableDataSource<Auction>(this.auctions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.displayedColumns = ['sNo', 'auctionId', 'productName', 'startDate', 'endDate', 'emdAmount', 'startBidAmount', 'minIncrementValue', 'currentBidAmount', 'availableQty', 'auctionState'];

      },
        (error) => {
          alert('An error occurred while fetching auctions: ' + error);
        });

      this._productService.listProducts().subscribe((data: Product[]) => {
        this.products = data;

      }, (error) => {
        alert('An error occurred' + error.error.message);
      });
    }
     else if (this.admin) {
      this._auctionService.listAuctions().subscribe((data: Auction[]) => {

        this.auctions = data;
        this.dataSource = new MatTableDataSource<Auction>(this.auctions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.displayedColumns = ['sNo', 'auctionId', 'productName', 'startDate', 'endDate', 'emdAmount', 'startBidAmount', 'minIncrementValue', 'currentBidAmount', 'availableQty', 'auctionState', 'status', 'handleStatus', 'edit', 'delete'];

      },
        (error) => {
          alert('An error occurred while fetching auctions: ' + error);
        });

      this._productService.listProducts().subscribe((data: Product[]) => {
        this.products = data;

      }, (error) => {
        alert('An error occurred' + error.error.message);
      });


    } else if (this.seller) {
      const userId = parseInt(JSON.parse(localStorage.getItem('user'))['userId']);
      console.log(userId);
      this._auctionService.listSellerAuctions(userId).subscribe((data: Auction[]) => {

        this.auctions = data;
        this.dataSource = new MatTableDataSource<Auction>(this.auctions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.displayedColumns = ['sNo', 'auctionId', 'productName', 'startDate', 'endDate', 'emdAmount', 'startBidAmount', 'minIncrementValue', 'currentBidAmount', 'availableQty', 'auctionState', 'status', 'delete'];

      },
        (error) => {
          alert('An error occurred while fetching auctions: ' + error);
        });

      this._productService.listUserProducts(userId).subscribe((data: Product[]) => {
        this.products = data;

      }, (error) => {
        alert('An error occurred' + error.error.message);
      });
    }
    // else if (this.buyer) {
    //   const userId = parseInt(JSON.parse(localStorage.getItem('user'))['userId']);
    //   console.log(userId);
    //   this._auctionService.listBuyerAuctions(userId).subscribe((data: Auction[]) => {

    //     this.auctions = data;
    //     this.dataSource = new MatTableDataSource<Auction>(this.auctions);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //     this.displayedColumns = ['sNo', 'auctionId', 'productName', 'startDate', 'endDate', 'emdAmount', 'startBidAmount', 'minIncrementValue', 'currentBidAmount', 'availableQty', 'auctionState'];

    //   },
    //     (error) => {
    //       alert('An error occurred while fetching auctions: ' + error);
    //     });

    //   this._productService.listProducts().subscribe((data: Product[]) => {
    //     this.products = data;

    //   }, (error) => {
    //     alert('An error occurred' + error.error.message);
    //   });
    // }
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }

  private clearUserType() {

    this.admin = false;
    this.seller = false;
    this.buyer = false;

  }

  filterChange(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  getProductName(productId: number): string {
    const product = this.products?.find(p => p.productId === productId);
    return product ? product.productName : '';
  }

  approveAuction(element: Auction) {
    if (confirm('Are you sure you want to approve this auction?')) {
      this._auctionService.approveAuction(element).subscribe(
        (success: boolean) => {
          if (success) {
            element.status = 'approved';
            this._router.navigate(['/admin-dashboard/list-auctions']);
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
            this._router.navigate(['/admin-dashboard/list-auctions']);
          } else {
            alert('An error occurred');
          }
        },
        (error) => {
          console.error('Error while denying the auction:', error);
          alert('An error occurred' + error.error.message);
        }
      );
    }
  }

  editAuction(auction: Auction): void {

  }

  deleteAuction(auction: Auction): void {
    if (confirm('Are you sure you want to delete this auction?')) {
      this._auctionService.deleteAuction(auction).subscribe((success: boolean) => {
        if (success) {
          this.auctions = this.auctions.filter(u => u !== auction);
          this._router.navigate(['/admin-dashboard/list-auctions']);
        } else {
          alert('An error occurred');
        }
      },
        (error) => {
          console.error('Error while deleting the auction:', error);
          alert('An error occurred' + error.error.message);
        });
    }
  }

  viewAuction(auction: Auction) {
    this.id = auction.auctionId;
    this._router.navigate(['/view-auction/' + this.id]);
  }
}
