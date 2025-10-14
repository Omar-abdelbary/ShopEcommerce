import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-changepass',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
],
  templateUrl: './changepass.component.html',
  styleUrl: './changepass.component.css'
})
export class ChangepassComponent {

  private readonly _FormBuilder = inject(FormBuilder) ;
  private readonly _AuthService = inject(AuthService) ;
  private readonly _ToastrService = inject(ToastrService) ;
  private readonly _Router = inject(Router) ;


  changePassForm:FormGroup = this._FormBuilder.group({
    oldPassword : [null , [Validators.required , Validators.pattern('^\\d{6,}$')] ] ,
    newPassword : [null , [Validators.required , Validators.pattern('^\\d{6,}$')]]
  }) ;



  changePassSubmit() {

    if (this.changePassForm.valid) {

      this._AuthService.changePassword(this.changePassForm.value).subscribe({
        next:(res)=>{
          // console.log(res);

          if (res.message === "Password changed successfully") {
            this._ToastrService.success(res.message , "Euphoria Folks Pvt Ltd") ;
            this._Router.navigate(['/home']) ;
          }

        },


        error:(err:HttpErrorResponse)=>{
          console.log(err);

        }
      })

    } else {


      this.changePassForm.markAllAsTouched()
    }
  }

}
