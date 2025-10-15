import { ToastrService } from 'ngx-toastr';
import { Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {




  // forget!:Subscription

  readonly  #destoryREf = inject(DestroyRef) ;

  private readonly _Router = inject(Router) ;
  private readonly _AuthService = inject(AuthService) ;
  private readonly _FormBuilder = inject(FormBuilder) ;
  private readonly _ToastrService = inject(ToastrService) ;

  Step:WritableSignal<number> = signal(1) ;



  forgetPassForm:FormGroup = this._FormBuilder.group({
    email: [ null , [Validators.required , Validators.email , Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')]]
  })


  forgetSubmit() {

    if (this.forgetPassForm.valid) {
      this._AuthService.forgetPassword(this.forgetPassForm.value).pipe(takeUntilDestroyed(this.#destoryREf)).subscribe({
        next:(res)=>{
          // console.log(res);
          this._ToastrService.success(res.message , "Euphoria Folks Pvt Ltd") ,
          setTimeout(() => {
            this.Step.set(2) ;
          }, 1000);
        },


        error:(err:HttpErrorResponse)=>{
          console.log(err);

        }
      })
    } else {
      this.forgetPassForm.markAllAsTouched()
    }
  }



  //    Reset Password


  resetPasswordForm:FormGroup = this._FormBuilder.group({
    email:[null , [Validators.required , Validators.email , Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')]] ,
    code : [null , [Validators.required , Validators.pattern(/^\d{6}$/)]] ,
    newPassword : [ null , [Validators.required , Validators.pattern('^\\d{6,}$')]] ,
  })



  resetPasswordSubmit() {

    if (this.resetPasswordForm.valid) {

      this._AuthService.resetPassword(this.resetPasswordForm.value).pipe(takeUntilDestroyed(this.#destoryREf)).subscribe({
        next:(res)=>{
          // console.log(res);
          this._ToastrService.success(res.message , "Euphoria Folks Pvt Ltd") ;

          setTimeout(() => {
            this._Router.navigate(["/loginUser"])
          }, 1000);

        },


        error:(err:HttpErrorResponse)=>{
          console.log(err);

        }
      })
    } else {

      this.resetPasswordForm.markAllAsTouched()
    }
  }




}
