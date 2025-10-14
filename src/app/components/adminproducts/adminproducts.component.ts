import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { AllproductsService } from '../../core/services/allproducts.service';
import { Iproducts } from '../../core/interfaces/iproducts';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adminproducts',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './adminproducts.component.html',
  styleUrl: './adminproducts.component.css'
})

export class AdminproductsComponent   implements OnInit , OnDestroy {









  private readonly _AllproductsService = inject(AllproductsService) ;
  private readonly _ToastrService = inject(ToastrService) ;

  Allproducts:WritableSignal<Iproducts[]> = signal([]) ;

  UnDelete!:Subscription ;
  UnAllProducts!:Subscription







  ngOnInit(): void {


   this.UnAllProducts=  this._AllproductsService.getAllProducts().subscribe({
      next:(res)=>{

        console.log(res);

        this.Allproducts.set(res.data) ;
        // this._ToastrService.success(res.message , "Euphoria Folks Pvt Ltd") ;


      } ,

      error(err :HttpErrorResponse) {
        console.log(err);
      },
    })
  }





  delete(productId:String | number) {
  this.UnDelete =  this._AllproductsService.deleteProduct(productId).subscribe({
      next:(res)=>{

        this._ToastrService.success(res.message , "Euphoria Folks Pvt Ltd") ;

          this.Allproducts.update((products) =>
        products.filter((p) => p.product_id !== productId)
      );


      },

      error:(err:HttpErrorResponse)=>{
        console.log(err);

      }
    })
  }









ngOnDestroy(): void {
  this.UnDelete?.unsubscribe() ;
  this.UnAllProducts?.unsubscribe() ;







}




}
