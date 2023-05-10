import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SellerAuthGuard implements CanActivate {

  constructor(private _userService : UserService, private _router : Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('token') && (localStorage.getItem('role') == "seller")) {
        return true;
      }else {
        alert("You do not have access to this page. Please log in as a seller.");
        this._router.navigate(['/login']);
        return false;
      }
  }

}
