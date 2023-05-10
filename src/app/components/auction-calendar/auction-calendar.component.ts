import { Component, ViewChild } from '@angular/core';
import { Auction } from 'src/app/models/auction/auction';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSourcePaginator, MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product/product';
import { AuctionService } from 'src/app/services/auction/auction.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { GlobalConstants } from 'src/app/global-constants';

@Component({
  selector: 'app-auction-calendar',
  templateUrl: './auction-calendar.component.html',
  styleUrls: ['./auction-calendar.component.css', '../../../table-styles.css']
})
export class AuctionCalendarComponent {

  liveAuctions: Auction[];
  liveDataSource: any;
  liveDisplayedColumns: string[] = ['sNo', 'productImage', 'productName', 'startDate', 'endDate', 'emdAmount', 'startBidAmount', 'availableQty', 'currentBidAmount', 'soldBy'];

  @ViewChild(MatPaginator, {static: true}) livePaginator: MatTableDataSourcePaginator;
  @ViewChild(MatSort, {static: true}) liveSort: MatSort;

  upcomingAuctions: Auction[];
  upcomingDataSource: any;
  upcomingDisplayedColumns: string[] = ['sNo', 'productImage', 'productName', 'startDate', 'endDate', 'emdAmount', 'startBidAmount', 'availableQty', 'soldBy'];

  @ViewChild(MatPaginator, {static: true}) upcomingPaginator: MatTableDataSourcePaginator;
  @ViewChild(MatSort, {static: true}) upcomingSort: MatSort;

  closedAuctions: Auction[];
  closedDataSource: any;
  // closedDisplayedColumns: string[] = ['sNo', 'productImage', 'productName', 'startDate', 'endDate', 'emdAmount', 'startBidAmount', 'availableQty', 'highestBidAmount', 'soldBy', 'winnerName'];
  closedDisplayedColumns: string[] = ['sNo', 'productImage', 'productName', 'startDate', 'endDate', 'emdAmount', 'startBidAmount', 'availableQty', 'highestBidAmount', 'soldBy'];


  @ViewChild(MatPaginator, {static: true}) closedPaginator: MatTableDataSourcePaginator;
  @ViewChild(MatSort, {static: true}) closedSort: MatSort;

  products: Product[];
  users: User[];
  apiUrl: string = GlobalConstants.apiURL;
  imgBasePath: string = `${this.apiUrl}image/images/`;
  id: number;
  imgNames: string[];

  constructor(private _auctionService: AuctionService, private _router: Router, private _productService: ProductService, private _userService: UserService) {
  }

  ngOnInit() {

    //products
    this._productService.listProducts().subscribe((data: Product[]) => {
      this.products = data;

    }, (error) => {
      alert('An error occurred' + error.error.message);
    });

    // users
    this._userService.listUsers().subscribe((data: User[]) => {
      this.users = data;

    }, (error) => {
      alert('An error occurred' + error.error.message);
    });

    //live auctions
    this._auctionService.listAuctionsWithState('live').subscribe((data: Auction[]) => {

      this.liveAuctions = data;
      this.liveDataSource = new MatTableDataSource<Auction>(this.liveAuctions);
      this.liveDataSource.paginator = this.livePaginator;
      this.liveDataSource.sort = this.liveSort;

    },
      (error) => {
        alert('An error occurred while fetching live auctions: ' + error);
      });

    //upcoming auctions
    this._auctionService.listAuctionsWithState('upcoming').subscribe((data: Auction[]) => {

      this.upcomingAuctions = data;
      this.upcomingDataSource = new MatTableDataSource<Auction>(this.upcomingAuctions);
      this.upcomingDataSource.paginator = this.upcomingPaginator;
      this.upcomingDataSource.sort = this.upcomingSort;

    },
      (error) => {
        alert('An error occurred while fetching upcoming auctions: ' + error);
      });

    //closed auctions
    this._auctionService.listAuctionsWithState('closed').subscribe((data: Auction[]) => {

      this.closedAuctions = data;
      this.closedDataSource = new MatTableDataSource<Auction>(this.closedAuctions);
      this.closedDataSource.paginator = this.closedPaginator;
      this.closedDataSource.sort = this.closedSort;

    },
      (error) => {
        alert('An error occurred while fetching closed auctions: ' + error);
      });
  }

  liveFilterChange(event : Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.liveDataSource.filter = filterValue;
  }

  upcomingFilterChange(event : Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.upcomingDataSource.filter = filterValue;
  }

  closedFilterChange(event : Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.closedDataSource.filter = filterValue;
  }

  getProductName(productId: number): string {
    const product = this.products?.find(p => p.productId === productId);
    return product ? product.productName : '';
  }

  getProduct(productId: number): Product {
    const product = this.products?.find(p => p.productId === productId);
    return product;
  }

  getUser(userId: number): User {
    const user = this.users?.find(u => u.userId === userId);
    return user;
  }

  getWinnerName(winnerId: number): string {
    const winner = this.users?.find(u => u.userId === winnerId);
    return winner ? winner.firstName + ' ' + winner.lastName: '';
  }

  viewAuction(auction: Auction) {
    this.id = auction.auctionId;
    this._router.navigate(['/view-auction/' + this.id]);
  }

  getImage(productId: number): string {
    const product = this.products?.find(p => p.productId === productId);

    if (product?.productImage) {
      this.imgNames = product.productImage.split(',');
    }
    return this.imgNames[0];
  }
}
