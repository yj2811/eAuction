export class Auction {

  public auctionId: number;
  public productId: number;
  public startDate: Date;
  public endDate: Date;
  public emdAmount: number;
  public startBidAmount: number;
  public minIncrementValue: number;
  public currentBidAmount: number;
  public availableQty: number;
  public auctionState: string;
  public status: string;
}

export interface AuctionResponse {
  success: boolean;
  message?: string;
  data: Auction[];
}

export class Review {

  public userId: number;
  public productId: number;
  public rating: number;
  public comment: string;
  public reviewTime: Date;
}

export interface ReviewResponse {
  success: boolean;
  message?: string;
  data: Review[];
}
