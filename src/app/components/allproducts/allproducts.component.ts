import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AllproductsService } from '../../core/services/allproducts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Iproducts } from '../../core/interfaces/iproducts';
import { CurrencyPipe } from '@angular/common';
import { Iproduct } from '../../core/interfaces/iproduct';
import { RouterLink } from "@angular/router";
import { WishlistService } from '../../core/services/wishlist.service';
import { log } from 'console';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-allproducts',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './allproducts.component.html',
  styleUrl: './allproducts.component.css'
})
export class AllproductsComponent implements OnInit {

  private readonly _AllproductsService = inject(AllproductsService) ;
  private readonly _WishlistService  = inject(WishlistService) ;
  private  readonly _ToastrService = inject(ToastrService) ;
  private readonly _CartService = inject(CartService) ;


  Allproducts:WritableSignal<Iproduct[] | null> = signal (null) ;



  ngOnInit(): void {

    this._AllproductsService.getAllProducts().subscribe({
      next:(res)=>{
        // console.log(res);

        this.Allproducts.set(res.data) ;

      },

      error:(err:HttpErrorResponse)=>{
        console.log(err);

      }
    })
  }













  //  add product to wishlist
  addWishlist(product_id: string | number) {
    this._WishlistService.addWishlistItem(product_id).subscribe({
      next:(res)=>{
        // console.log(res);

        if (res.message === "Product added to wishlist") {

          this._ToastrService.success(res.message , "Euphoria Folks Pvt Ltd")
        }

      },


      error:(err:HttpErrorResponse)=>{
        console.log(err);

      }
    })
  }






// add item in the cart


addItemCart(productId:string| number) {
  this._CartService.addCart(productId).subscribe({
    next:(res)=>{
      // console.log(res);

      if (res.message === "Item added to cart") {


        this._ToastrService.success(res.message , "Euphoria Folks Pvt Ltd") ;

      }

    },

    error:(err:HttpErrorResponse)=>{
      console.log(err);

    }
  })
}





































}
