import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, CategoryResponse } from 'src/app/models/category/category';
import { map } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/global-constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl: string = GlobalConstants.apiURL;
  // baseUrl: string = "http://localhost/eAuction/api/category";
  baseUrl: string = `${this.apiUrl}category`;

  constructor(private _http: HttpClient) { }

  requestCategories() {
    return this._http.get<CategoryResponse>(this.baseUrl + '/request-category.php').pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  approveCategory(category: Category) {
    return this._http.put<CategoryResponse>(this.baseUrl + '/approve-category.php?id=' + category.categoryId, category).pipe(
      map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  denyCategory(category: Category) {
    return this._http.put<CategoryResponse>(this.baseUrl + '/deny-category.php?id=' + category.categoryId, category).pipe(
      map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  addCategory(category : Category) {
    return this._http.post<CategoryResponse>(this.baseUrl + '/insert-category.php', category).pipe(
      map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

listCategories() {
    return this._http.get<CategoryResponse>(this.baseUrl + '/list-categories.php').pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  listApprovedCategories() {
    return this._http.get<CategoryResponse>(this.baseUrl + '/list-approved-categories.php').pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  deleteCategory(category: Category) {
    return this._http.delete<CategoryResponse>(this.baseUrl + '/delete-category.php?id=' + category.categoryId).pipe(
      map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }
}
