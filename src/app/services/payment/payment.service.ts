import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/global-constants';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaymentResponse, Payment} from 'src/app/models/payment/payment';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _http: HttpClient) { }

  apiUrl: string = GlobalConstants.apiURL;
  // baseUrl: string = "http://localhost/eAuction/api/auction";
  baseUrl: string = `${this.apiUrl}payment`;

  getOrderId(data) {
    return this._http.post(this.baseUrl + '/get-order-id.php', data).pipe(
      map((response) => {
        if (response) {
          return response;
        } else {
          throw new Error();
        }
      })
    );
  }

  createPayment(data) {
    return this._http.post<PaymentResponse>(this.baseUrl + '/insert-payment.php', data).pipe(
      map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  updatePaymentStatus(data) {
    return this._http.post<PaymentResponse>(this.baseUrl + '/update-payment-status.php', data).pipe(
      map((response) => {
        if (response.success) {
          return response.success;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  isEMDpaid(data) {
    return this._http.post<PaymentResponse>(this.baseUrl + '/emd-status.php', data).pipe(
      map((response) => {
        if (response.success) {
          return response.message;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }
}
