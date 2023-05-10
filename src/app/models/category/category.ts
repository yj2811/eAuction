export class Category {

  public categoryId: number;
  public categoryName: string;
  public status: string;

  constructor() {

  }
}

export interface CategoryResponse {
  success: boolean;
  message?: string;
  data: Category[];
}
