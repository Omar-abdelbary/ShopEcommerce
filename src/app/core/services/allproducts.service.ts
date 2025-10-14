import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllproductsService {

  constructor(private readonly _HttpClient : HttpClient) { } ;



  getAllProducts() :Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/products?limit=90`)
  }





  getProductById(productId:string| number |null):Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/products/${productId}`)
  }



  addProduct(productDetails:object):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/products` , productDetails ,
      
    )
  }



  updateProduct(productId:number| null | string , productDetails:object ):Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/products/${productId}` ,
      productDetails ,

    )
  }


  addImgForProduct(infoImg:object , productId:string | number| null):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/products/${productId}/images` ,
      infoImg ,

    )
  }



deleteProduct(ProductId:String | number):Observable<any> {
  return this._HttpClient.delete(`${environment.baseUrl}/api/products/${ProductId}` ,

  )
}




















}
