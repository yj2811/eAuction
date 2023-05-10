export class Bid {

  public bidId: number;
  public buyerId: number;
  public auctionId: number;
  public bidPricePerUnit: number;
  public bidQty: number;
  public bidAmount: number;
  public bidDate: Date;
}

export interface BidResponse {
  success: boolean;
  message?: string;
  data: Bid[];
}
