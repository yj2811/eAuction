import { Component, ViewChild } from '@angular/core';
import { Bid } from 'src/app/models/bid/bid';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Product } from 'src/app/models/product/product';
import { Auction } from 'src/app/models/auction/auction';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BidService } from 'src/app/services/bid/bid.service';
import { Router } from '@angular/router';
import { AuctionService } from 'src/app/services/auction/auction.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-list-bids',
  templateUrl: './list-bids.component.html',
  styleUrls: ['./list-bids.component.css', '../../../table-styles.css']
})
export class ListBidsComponent {
  bids: Bid[];
  dataSource: MatTableDataSource<Bid>;

  displayedColumns: string[] = ['sNo', 'productName', 'startDate', 'endDate', 'bidPlaced', 'totalQty', 'highestBidAmount', 'auctionState'];

  id: number;

  products: Product[];
  auctions: Auction[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatTableDataSourcePaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _bidService: BidService, private _router: Router, private _auctionService: AuctionService, private _productService: ProductService) {

  }

  ngOnInit() {
    const userId = parseInt(JSON.parse(localStorage.getItem('user'))?.userId || '');

    this._bidService.listUserAllBids(userId).subscribe((data: Bid[]) => {

      this.bids = data;
      this.dataSource = new MatTableDataSource<Bid>(this.bids);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    },
      (error) => {
        alert('An error occurred while fetching bids: ' + error);
      });

      //auctions
      this._auctionService.listAuctions().subscribe((data: Auction[]) => {

        this.auctions = data;
      },
        (error) => {
          alert('An error occurred while fetching auctions: ' + error);
        });

        //products
      this._productService.listProducts().subscribe((data: Product[]) => {
        this.products = data;

      }, (error) => {
        alert('An error occurred' + error.error.message);
      });

  }

  filterChange(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  viewAuction(bid: Bid) {
    this.id = bid.auctionId;
    this._router.navigate(['/view-auction/' + this.id]);
  }

  getProductName(auctionId: number){
    const auction = this.auctions?.find(a => a.auctionId === auctionId);
    const product = this.products?.find(p => p.productId === auction.productId);
    return product ? product.productName : '';
  }

  getStartDate(auctionId: number) {
    const auction = this.auctions?.find(a => a.auctionId === auctionId);
    return auction ? auction.startDate : '';
  }

  getEndDate(auctionId: number) {
    const auction = this.auctions?.find(a => a.auctionId === auctionId);
    return auction ? auction.endDate : '';
  }

  getHighestBidAmount(auctionId: number) {
    const auction = this.auctions?.find(a => a.auctionId === auctionId);
    return auction ? auction.currentBidAmount : '';
  }

  getAuctionState(auctionId: number) {
    const auction = this.auctions?.find(a => a.auctionId === auctionId);
    return auction ? auction.auctionState : '';
  }
}
