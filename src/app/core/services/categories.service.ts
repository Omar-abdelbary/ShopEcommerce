import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private readonly _HttpClient : HttpClient) { } ;




  getAllCategories() :Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/categories`)
  }



  getSpecificCategoryById(categoryId:string | null):Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/categories/${categoryId}`)
  }



  AddCategory(categoryDetails:object):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/categories` , categoryDetails ,
    )
  }

  UpdateCategory(categoryId:string |null  , categoryDetails:object):Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/categories/${categoryId}` ,
      categoryDetails ,
    )
  }




  deleteCategory(categoryId:number |string  ):Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/categories/${categoryId}` ,
    )
  }







































}
