import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AllproductsService } from '../../core/services/allproducts.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editproductadmin',
  standalone: true,
  imports: [
    ReactiveFormsModule ,
    NgClass ,
  ],
  templateUrl: './editproductadmin.component.html',
  styleUrl: './editproductadmin.component.css'
})
export class EditproductadminComponent   implements OnInit {

  private readonly _FormBuilder = inject(FormBuilder) ;
  private  readonly  _Router = inject(Router) ;
  private readonly _ToastrService = inject(ToastrService) ;
  private readonly _AllproductsService = inject(AllproductsService) ;
  private readonly _ActivatedRoute = inject(ActivatedRoute) ;

  idProduct:WritableSignal<string | null> = signal("")



  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        // console.log(p.get("id"));
        this.idProduct.set(p.get("id"))

      }
    })
  }


  EditProductForm:FormGroup = this._FormBuilder.group({

      name :  [ null , [Validators.required , Validators.minLength(5) , Validators.maxLength(15)]] ,
        description : [ null , [Validators.required , Validators.minLength(5) , Validators.maxLength(30)]] ,
        price : [null , [Validators.required , Validators.pattern("^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$")]] ,
        category_id :[null , [Validators.required , Validators.pattern('^[1-9][0-9]*$')]] ,
        brand : [null , [Validators.required , Validators.minLength(5) , Validators.maxLength(20)]] ,

  }) ;





  EditProduct() {

    if (this.EditProductForm.valid) {

this._AllproductsService.updateProduct(this.idProduct() , this.EditProductForm.value  ).subscribe({
  next:(res)=>{
    // console.log(res);

    if (res.message === "Product updated successfully") {

      this._ToastrService.success(res.message  , "Euphoria Folks Pvt Ltd") ;
      this._Router.navigate(["/adminproducts"]) ;

    }

  },

  error:(err:HttpErrorResponse)=>{
    console.log(err);

  }
})

    } else {

      this.EditProductForm.markAllAsTouched() ;
    }

  }






}
