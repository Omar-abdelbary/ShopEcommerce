import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private readonly _HttpClient = inject(HttpClient) ;





  getAllReviewProduct(productId:string| number |null):Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/reviews/${productId}`
    )
  }


  AddReview(productId:string| number | null , reviewinfo:object):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/reviews/${productId}` ,
      reviewinfo ,
    )
  }


  updateReview(reviewId:string | number | null , productInfo:object):Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/reviews/${reviewId}` ,
      productInfo ,

    )
  }


  deleteReview(reviewId:string | number | null):Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/reviews/${reviewId}` ,
    )
  }



















}
