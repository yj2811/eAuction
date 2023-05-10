import { Component, ViewChild } from '@angular/core';
import { Auction } from 'src/app/models/auction/auction';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Product } from 'src/app/models/product/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuctionService } from 'src/app/services/auction/auction.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { faWirsindhandwerk } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-list-winners',
  templateUrl: './list-winners.component.html',
  styleUrls: ['./list-winners.component.css', '../../../table-styles.css']
})
export class ListWinnersComponent {
  auctions: Auction[];
  dataSource: MatTableDataSource<Auction>;

  admin: boolean = false;
  user: boolean = false;

  // displayedColumns = ['sNo', 'productId', 'productName', 'winnerName', 'startDate', 'endDate', 'quantity', 'bidPrice', 'invoice'];
  displayedColumns = ['sNo', 'productId', 'productName', 'winnerName', 'startDate', 'endDate', 'bidPrice', 'invoice'];


  id: number;

  products: Product[];
  users: User[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatTableDataSourcePaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _auctionService: AuctionService, private _router: Router, private _productService: ProductService, private _userService: UserService) {
    _userService.isLoggedIn.subscribe(status => this.clearUserType())
  }

  ngOnInit() {
    const role = localStorage.getItem('role');
    if (role == 'admin') {
      this.admin = true;
    } else {
      this.user = true;
    }

    if (this.admin) {
      this._auctionService.listAuctionsWithState('closed').subscribe((data: Auction[]) => {

        this.auctions = data;
        this.dataSource = new MatTableDataSource<Auction>(this.auctions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
        (error) => {
          alert('An error occurred while fetching winners: ' + error);
        });

        this._productService.listProducts().subscribe((data: Product[]) => {
          this.products = data;

        }, (error) => {
          alert('An error occurred' + error.error.message);
        });

        this._userService.listBuyers().subscribe((data: User[]) => {

          this.users = data;
        },
          (error) => {
            alert('An error occurred while fetching users: ' + error);
          });

    }

    //fix this for sellers and show only closed auctions

    // else if (this.user) {
    //   const userId = parseInt(JSON.parse(localStorage.getItem('user'))['userId']);
    //   console.log(userId);
    //   this._auctionService.listSellerAuctions(userId).subscribe((data: Auction[]) => {

    //     this.auctions = data;
    //     this.dataSource = new MatTableDataSource<Auction>(this.auctions);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;

    //   },
    //     (error) => {
    //       alert('An error occurred while fetching winners: ' + error);
    //     });

    //     this._productService.listProducts().subscribe((data: Product[]) => {
    //       this.products = data;

    //     }, (error) => {
    //       alert('An error occurred' + error.error.message);
    //     });

    //     this._userService.listSellers().subscribe((data: User[]) => {

    //       this.users = data;
    //     },
    //       (error) => {
    //         alert('An error occurred while fetching sellers: ' + error);
    //       });
    // }
  }

  private clearUserType() {
    this.admin = false;
    this.user = false;
  }

  filterChange(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  viewAuction(auction: Auction) {
    this.id = auction.auctionId;
    this._router.navigate(['/view-auction/' + this.id]);
  }

  getProductName(productId: number): string {
    const product = this.products?.find(p => p.productId === productId);
    return product ? product.productName : '';
  }

  getWinnerName(winnerId: number): string {
    const winner = this.users?.find(u => u.userId === winnerId);
    console.log(winner);
    return winner ? winner.firstName + ' ' + winner.lastName: '';
  }

  getBidQty() {

  }

}
