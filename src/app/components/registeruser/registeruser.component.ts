import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';

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






  registerForm:FormGroup = this._FormBuilder.group({

    name: [null , [Validators.required , Validators.minLength(5) , Validators.maxLength(30)]] ,
    email : [ null , [Validators.required , Validators.email , ]] ,
    password : [ null , [Validators.required , Validators.pattern('^\\d{6,}$')]] ,
  })

// Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')


  registerSubmit() {
    if (this.registerForm.valid) {

      this._AuthService.registerAsUser(this.registerForm.value).subscribe({
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
