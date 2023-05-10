import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Product, ProductResponse } from '../../models/product/product'
import { map } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = GlobalConstants.apiURL;
  // baseUrl: string = "http://localhost/eAuction/api/product";
  baseUrl: string = `${this.apiUrl}product`;

  constructor(private _http : HttpClient ) { }

  addProduct(product : Product) {
    return this._http.post<ProductResponse>(this.baseUrl + '/insert-product.php', product).pipe(
      map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }


  listProducts() {
    return this._http.get<ProductResponse>(this.baseUrl + '/list-products.php').pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  listUserProducts(id: number) {
    return this._http.get<ProductResponse>(this.baseUrl + '/list-user-products.php?id=' + id).pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  deleteProduct(product: Product) {
    return this._http.delete<ProductResponse>(this.baseUrl + '/delete-product.php?id=' + product.productId).pipe(
      map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }


  getProductById(id: number){
    return this._http.get<ProductResponse>(this.baseUrl + '/get-product-by-id.php?id=' + id).pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  editProduct(product: Product) {
    return this._http.put<ProductResponse>(this.baseUrl + '/edit-product.php?id=' + product.productId, product)
      .pipe(map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      }));
  }
}
