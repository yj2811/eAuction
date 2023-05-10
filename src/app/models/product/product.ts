export class Product {

  public productId: number;
  public categoryId: number;
  public sellerId: number;
  public productName: string;
  public productDesc: string;
  public productFeatures: string;
  public productYOM: number;
  public productImage: string;
}

export interface ProductResponse {
  success: boolean;
  message?: string;
  data: Product[];
}
