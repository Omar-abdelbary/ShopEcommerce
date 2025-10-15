import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _HttpClient = inject(HttpClient);

  CartNumbers:WritableSignal<number> = signal(0) ;

  addCart(productId: string | number): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/cart`, {
      product_id: productId,
      quantity: 1,
    });
  }

  getCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/cart`);
  }

  updateCartItem(
    cartId: string | number,
    productId: string | number | null,
    quantity: string | number
  ): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/cart/${cartId}`, {
      product_id: productId,
      quantity: quantity,
    });
  }

  deleteItem(cartId: string | number): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/cart/${cartId}`);
  }

  deleteAllItems(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/cart`);
  }

  paymentByVisa(): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/create-checkout-session`,
      {}
    );
  }

  // order details

  orderDetails(orderId: string | number | null): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}/api/orders/getOrderDetails/${orderId}`
    );
  }
}
