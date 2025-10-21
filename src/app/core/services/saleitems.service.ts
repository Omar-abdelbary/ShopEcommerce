import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SaleitemsService {
  private readonly _HttpClient = inject(HttpClient);

  getAllItemsSale(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/saleItems`);
  }

  addSaleItem(productInfo: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/saleItems`,
      productInfo
    );
  }

  updateSaleItem(
    productId: string | number,
    productInfo: object
  ): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/api/saleItems/${productId}`,
      productInfo
    );
  }

  deleteSaleProduct(productId: string | number): Observable<any> {
    return this._HttpClient.delete(
      `${environment.baseUrl}/api/saleItems/${productId}`
    );
  }
}
