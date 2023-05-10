export class Payment {

  public emdId: number;
  public buyerId: number;
  public auctionId: number;
  public orderId: number;
  public paymentId: number;
  public paymentAmount: number;
  public paymentDate: Date;
  public status: string;
}

export interface PaymentResponse {
  success: boolean;
  message?: string;
  data: Payment[];
}
