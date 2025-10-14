import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly _HttpClient = inject(HttpClient) ;


  addWishlistItem(product_id:string | number | null):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/wishlist` ,
      {product_id} ,
    )
  }





  getWishlist ():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/wishlist` ,
    )
  }



  deleteItem(itemId:string | number):Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/wishlist/${itemId}` ,

    )
  }


  deleteAllItems():Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/wishlist` ,
    )
  }



}
