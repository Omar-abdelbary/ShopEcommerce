import { ToastrService } from 'ngx-toastr';
import { Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-loginadmin',
  standalone: true,
  imports: [
    ReactiveFormsModule ,
    NgClass
  ],
  templateUrl: './loginadmin.component.html',
  styleUrl: './loginadmin.component.css'
})
export class LoginadminComponent {



   private readonly _FormBuilder = inject(FormBuilder) ;
    private readonly _Router = inject(Router) ;
    private readonly _AuthService = inject(AuthService) ;
    private readonly _ToastrService = inject(ToastrService) ;
    private readonly _DestroyRef = inject(DestroyRef) ;






    loginAsAdminForm:FormGroup = this._FormBuilder.group({
      email : [null , [Validators.required , Validators.email , Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')]] ,
      password : [ null , [Validators.required , Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]] ,
    })




    loginAdminSubmit() {
      if (this.loginAsAdminForm.valid) {

        this._AuthService.loginAsAdmin(this.loginAsAdminForm.value).pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
          next:(res)=>{
            // console.log(res);
            this._ToastrService.success(res.message , "Euphoria Folks Pvt Ltd") ;
            localStorage.setItem("userToken" , res.data.token) ;
            this._AuthService.Token() ;

            setTimeout(() => {
              this._Router.navigate(["/adminproducts"])
            }, 1000);


          },

          error:(err:HttpErrorResponse)=>{
            console.log(err);

          }
        })

      } else {

        this.loginAsAdminForm.markAllAsTouched() ;
      }
    }
}
