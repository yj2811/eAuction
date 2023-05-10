import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuctionResponse, Auction, ReviewResponse, Review} from 'src/app/models/auction/auction';
import { map } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/global-constants';

function _window() : any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  get nativeWindow() : any {
    return _window();
  }

  apiUrl: string = GlobalConstants.apiURL;
  // baseUrl: string = "http://localhost/eAuction/api/auction";
  baseUrl: string = `${this.apiUrl}auction`;

  constructor(private _http: HttpClient) {
    this.updateAuctionState();
  }

  updateAuctionState() {
    return this._http.get<AuctionResponse>(this.baseUrl + '/update-auction-state.php').pipe(
      map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  requestAuctions() {
    return this._http.get<AuctionResponse>(this.baseUrl + '/request-auction.php').pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  approveAuction(auction: Auction) {
    return this._http.put<AuctionResponse>(this.baseUrl + '/approve-auction.php?id=' + auction.auctionId, auction).pipe(
      map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  denyAuction(auction: Auction) {
    return this._http.put<AuctionResponse>(this.baseUrl + '/deny-auction.php?id=' + auction.auctionId, auction).pipe(
      map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  addAuction(auction: Auction) {
    return this._http.post<AuctionResponse>(this.baseUrl + '/insert-auction.php', auction).pipe(
      map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  listAuctions() {
    return this._http.get<AuctionResponse>(this.baseUrl + '/list-auctions.php').pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  listAuctionsWithState(state: string) {
    return this._http.get<AuctionResponse>(this.baseUrl + '/list-auctions.php?_state=' + state).pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  listSellerAuctions(id: number) {
    return this._http.get<AuctionResponse>(this.baseUrl + '/list-seller-auctions.php?id=' + id).pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  // listBuyerAuctions(id: number) {
  //   return this._http.get<AuctionResponse>(this.baseUrl + '/list-buyer-auctions.php?id=' + id).pipe(
  //     map((response) => {
  //       if (response.success) {
  //         return response.data;
  //       } else {
  //         throw new Error(response.message);
  //       }
  //     })
  //   );
  // }

  deleteAuction(auction: Auction) {
    return this._http.delete<AuctionResponse>(this.baseUrl + '/delete-auction.php?id=' + auction.auctionId).pipe(
      map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  popularAuctions() {
    return this._http.get<AuctionResponse>(this.baseUrl + '/list-auctions.php?_limit=3').pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getAuctionById(id: number){
    return this._http.get<AuctionResponse>(this.baseUrl + '/get-auction-by-id.php?id=' + id).pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  addReview(review: Review) {
    return this._http.post<ReviewResponse>(this.baseUrl + '/insert-review.php', review).pipe(
      map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  listReviews(id: number) {
    return this._http.get<ReviewResponse>(this.baseUrl + '/list-reviews.php?id=' + id).pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

}
