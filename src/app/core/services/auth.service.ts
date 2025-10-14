import { ToastrService } from 'ngx-toastr';
import { environment } from './../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { platformBrowser } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly _HttpClient :HttpClient) { }

  private readonly _Plat_Id = inject(PLATFORM_ID) ;
  private readonly _Router = inject(Router) ;
  private readonly _ToastrService = inject(ToastrService) ;
  SaveToken : any = null ;






  loginAsAdmin(FormData:object) :Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/admin/login` , FormData)
  }



  loginAsUser(FormData:object):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/auth/login` , FormData)
  }



  registerAsUser(FormData:object):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/auth/signup` , FormData )

  }


  getUserInfo():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/getUserDetails`)
  }


  resetPassword(FormData:object):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/auth/resetPassword` , FormData)
  }


  changePassword(FormData:object):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/auth/changePassword` , FormData ,

    )
  }


  forgetPassword(FormData:object):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/auth/forgotPassword` , FormData ,

     )
  }


  loginWithGoogle() {


    if (isPlatformBrowser(this._Plat_Id)) {

      window.location.href = `${environment.baseUrl}/api/auth/google`
    }



  }



  Token() {
    this.SaveToken = jwtDecode(localStorage.getItem("userToken") !)
  }



  logout() {
    if (isPlatformBrowser(this._Plat_Id)) {

      localStorage.getItem("userToken") ;
      localStorage.removeItem("userToken") ;
      this.SaveToken =  null ;
      this._ToastrService.success("Success SignOut" , "Euphoria Folks Pvt Ltd")
      setTimeout(() => {
        this._Router.navigate(["/loginUser"])
      }, 1000);
    }
  }



  getAdminData():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/admin/getDetails` ,

    )
  }



  getUserData():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/getUserDetails` ,
      
    )
  }







}
