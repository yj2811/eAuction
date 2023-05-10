import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/global-constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private _http: HttpClient) { }

  apiUrl: string = GlobalConstants.apiURL;
  // baseUrl: string = "http://localhost/eAuction/api/auction";
  baseUrl: string = `${this.apiUrl}notify`;

  notifyRegisteredUsers(data){
    return this._http.post(this.baseUrl + '/notify-registered-users.php', data).pipe(
      map((response) => {
        if (response) {
          return response;
        } else {
          throw new Error();
        }
      })
    );
  }
}
