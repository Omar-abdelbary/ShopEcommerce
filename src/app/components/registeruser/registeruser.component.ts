import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-registeruser',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink ,
    NgClass ,
],
  templateUrl: './registeruser.component.html',
  styleUrl: './registeruser.component.css'
})
export class RegisteruserComponent {

  private readonly _FormBuilder = inject(FormBuilder) ;
  private readonly _AuthService = inject(AuthService) ;
  private readonly _Router = inject(Router) ;
  private readonly _ToastrService = inject(ToastrService) ;
  private readonly _DestroyRef = inject(DestroyRef) ;






  registerForm:FormGroup = this._FormBuilder.group({

    name: [null , [Validators.required , Validators.minLength(5) , Validators.maxLength(30)]] ,
    email : [ null , [Validators.required , Validators.email , ]] ,
    password : [ null , [Validators.required , Validators.pattern('^\\d{6,}$')]] ,
  })




  registerSubmit() {
    if (this.registerForm.valid) {

      this._AuthService.registerAsUser(this.registerForm.value).pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
        next:(res)=>{

          if (res.message === "Signup successful") {

            this._ToastrService.success(res.message  , "Euphoria Folks Pvt Ltd") ;

            setTimeout(() => {
              this._Router.navigate(["/loginUser"])
            }, 1000);
          }

        },

        error:(err:HttpErrorResponse)=>{
          console.log(err);

        }
      })
    } else {


      this.registerForm.markAllAsTouched()
    }
  }




  loginGoogle() {
    this._AuthService.loginWithGoogle() ;
  }

}
