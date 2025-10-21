import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllproductsService } from '../../core/services/allproducts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {


  private readonly _FormBuilder = inject(FormBuilder) ;
  private readonly _AllproductsService = inject(AllproductsService) ;
  private readonly _Router = inject(Router) ;
  private readonly  _ToastrService = inject(ToastrService) ;





  AddProductForm :FormGroup = this._FormBuilder.group({
    name: [null , [Validators.required  , Validators.minLength(8) , Validators.maxLength(30)]] ,
    description : [null , [Validators.required , Validators.minLength(10) , Validators.maxLength(30) ] ] ,
    price : [null , [Validators.required , Validators.pattern("^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$")]]  ,
    category_id : [null , [Validators.required , Validators.pattern('^[1-9][0-9]*$')]] ,
    brand : [null , [Validators.required , Validators.minLength(5) , Validators.maxLength(20)]] ,


  })


  AddProductSubmit () {

    if (this.AddProductForm.valid) {

      this._AllproductsService.addProduct(this.AddProductForm.value).subscribe({
        next:(res)=>{
          // console.log(res);

          if (res.message === "Product created successfully") {

            this._ToastrService.success(res.message , "Euphoria Folks Pvt Ltd") ;

            this._Router.navigate(["/adminproducts"]) ;

          }

        },

        error:(err:HttpErrorResponse)=>{
          console.log(err);

        }
      })

    } else {


      this.AddProductForm.markAllAsTouched() ;
    }
  }





























}
