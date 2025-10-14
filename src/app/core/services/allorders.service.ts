import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AllordersService {
  private readonly _HttpCleint = inject(HttpClient);

  getAllorderAdmin(): Observable<any> {
    return this._HttpCleint.get(
      `${environment.baseUrl}/api/orders/getAllOrders`,
   
    );
  }

  getDetailsOrderAdmin(OrderId: string | number): Observable<any> {
    return this._HttpCleint.get(
      `${environment.baseUrl}/api/orders/getOrderDetailsAdmin/${OrderId}`,

    );
  }

  getUserOrder(): Observable<any> {
    return this._HttpCleint.get(
      `${environment.baseUrl}/api/orders/getUserOrders`,

    );
  }

  getDetailsOrderUser(OrderId: string): Observable<any> {
    return this._HttpCleint.get(
      `${environment.baseUrl}/api/orders/getOrderDetails/${OrderId}`,

    );
  }
}
