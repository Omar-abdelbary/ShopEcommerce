import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AllproductsService } from '../../core/services/allproducts.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-addimg',
  standalone: true,
  imports: [
    ReactiveFormsModule ,
  ],
  templateUrl: './addimg.component.html',
  styleUrl: './addimg.component.css'
})
export class AddimgComponent  implements OnInit {

  private readonly _FormBuilder = inject(FormBuilder) ;
  private readonly _Router = inject(Router) ;
  private readonly _ToastrService = inject(ToastrService) ;
  private readonly _AllproductsService = inject(AllproductsService) ;
  private readonly _ActivatedRoute = inject(ActivatedRoute) ;


  id:WritableSignal<string| number | null> = signal("")  ;



  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        this.id.set(p.get("id"))



      }
    })
  }










  addImgForm:FormGroup  = this._FormBuilder.group({
    image_url : [null , [Validators.required , Validators.pattern(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg)$/i) ]] ,
    is_main : [true] ,
  })









Add() {
  if (this.addImgForm.valid) {

    this._AllproductsService.addImgForProduct(this.addImgForm.value ,this.id() ).subscribe({
      next:(res)=>{
        // console.log(res);

        if (res.message === "Image added successfully") {

          this._ToastrService.success(res.message , "Euphoria Folks Pvt Ltd")

          this._Router.navigate(["/adminproducts"])
        }

      },

      error:(err:HttpErrorResponse)=>{
        console.log(err);

      }
    })
  } else {

    this.addImgForm.markAllAsTouched() ;
  }
}






}
