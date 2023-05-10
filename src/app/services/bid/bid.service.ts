import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bid, BidResponse } from 'src/app/models/bid/bid';
import { map } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/global-constants';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  apiUrl: string = GlobalConstants.apiURL;
  // baseUrl: string = "http://localhost/eAuction/api/bid";
  baseUrl: string = `${this.apiUrl}bid`;

  constructor(private _http: HttpClient) { }

  addBid(bid: Bid) {
    return this._http.post<BidResponse>(this.baseUrl + '/insert-bid.php', bid).pipe(
      map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  listAuctionBids(id: number) {
    return this._http.get<BidResponse>(this.baseUrl + '/list-auction-bids.php?id=' + id).pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }


  listUserBid(buyerId: number, auctionId: number) {
    return this._http.get<BidResponse>(`${this.baseUrl}/list-user-bid.php?buyerId=${buyerId}&auctionId=${auctionId}`).pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  listUserAllBids(id: number) {
    return this._http.get<BidResponse>(this.baseUrl + '/list-user-all-bids.php?id=' + id).pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  editBid(bid: Bid) {
    console.log(bid);
    return this._http.put<BidResponse>(this.baseUrl + '/edit-bid.php?id=' + bid.bidId, bid)
      .pipe(map((response) => {
        console.log(response);
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      }));
  }

  isBidMade(data) {
    return this._http.post<BidResponse>(this.baseUrl + '/bid-made.php', data).pipe(
      map((response) => {
        if (response.success) {
          return response.message;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }
}
