import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User, UserResponse, UserDetails, UserDetailsResponse } from '../../models/user/user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GlobalConstants } from 'src/app/global-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = GlobalConstants.apiURL;
  // baseUrl: string = "http://localhost/eAuction/api/user";
  baseUrl: string = `${this.apiUrl}user`;

  redirectURL !: string;

  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient, private _router: Router) { }

  public userRegistration(user: User) {
    return this._http.post<UserResponse>(this.baseUrl + '/register.php', user).pipe(
      map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  public userLogin(user: User) {
    return this._http.post<UserResponse>(this.baseUrl + '/login.php', user).pipe(
      map((response) => {
        if (response.success) {
          localStorage.setItem('token', response.data['token']);
          localStorage.setItem('role', response.data['role']);
          localStorage.setItem('user', JSON.stringify(response.data['user']));
          this.isLoggedIn.next(true);
          return response;
        } else if (response.message == "pending") {
          this._router.navigate(['/']);
          alert('Your account is pending for approval. Please wait.');
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  reloadAdmin() {
    if (localStorage.getItem('token') && (localStorage.getItem('role') == "admin")) {
      this._router.navigate(['/admin-dashboard']);
    }
  }

  reloadSeller() {
    if (localStorage.getItem('token') && (localStorage.getItem('role') == "seller")) {
      this._router.navigate(['/seller-dashboard']);
    }
  }

  reloadBuyer() {
    if (localStorage.getItem('token') && (localStorage.getItem('role') == "buyer")) {
      this._router.navigate(['/buyer-dashboard']);
    }
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    this.isLoggedIn.next(false);
  }

  requestUsers() {
    return this._http.get<UserResponse>(this.baseUrl + '/request-user.php').pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  approveUser(user: User) {
    return this._http.put<UserResponse>(this.baseUrl + '/approve-user.php?id=' + user.userId, user).pipe(
      map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  denyUser(user: User) {
    return this._http.put<UserResponse>(this.baseUrl + '/deny-user.php?id=' + user.userId, user).pipe(
      map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  listUsers() {
    return this._http.get<UserResponse>(this.baseUrl + '/list-users.php').pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  listSellers() {
    return this._http.get<UserResponse>(this.baseUrl + '/list-sellers.php').pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  listBuyers() {
    return this._http.get<UserResponse>(this.baseUrl + '/list-buyers.php').pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  deleteUser(user: User) {
    return this._http.delete<UserResponse>(this.baseUrl + '/delete-user.php?id=' + user.userId).pipe(
      map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  // work on these two
  getUserDetailsById(id: number){
    return this._http.get<UserDetailsResponse>(this.baseUrl + '/get-user-details-by-id.php?id=' + id).pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  editUser(userDetails: UserDetails) {
    return this._http.put<UserDetailsResponse>(this.baseUrl + '/edit-user-details.php?id=' + userDetails.userId, userDetails)
      .pipe(map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      }));
  }

}

