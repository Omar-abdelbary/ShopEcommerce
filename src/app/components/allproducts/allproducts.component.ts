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
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-allproducts',
  standalone: true,
  imports: [CurrencyPipe, RouterLink  , PaginatorModule],
  templateUrl: './allproducts.component.html',
  styleUrl: './allproducts.component.css'
})
export class AllproductsComponent implements OnInit {

  private readonly _AllproductsService = inject(AllproductsService) ;
  private readonly _WishlistService  = inject(WishlistService) ;
  private  readonly _ToastrService = inject(ToastrService) ;
  private readonly _CartService = inject(CartService) ;


  Allproducts:WritableSignal<Iproduct[] | null> = signal (null) ;



  totalItems = signal(0);
  loading = signal(false);
  rows = 8;



  ngOnInit(): void {

    // this._AllproductsService.getAllProducts().subscribe({
    //   next:(res)=>{
    //     // console.log(res);

    //     this.Allproducts.set(res.data) ;

    //   },

    //   error:(err:HttpErrorResponse)=>{
    //     console.log(err);

    //   }
    // })



     this.loadPage(1);

  }

   loadPage(page: number) {
    this.loading.set(true);
    this._AllproductsService.getProducts(page, this.rows).subscribe({
      next: res => {
        this.Allproducts.set(res.data);
        this.totalItems.set(res.total_items);
        this.loading.set(false);
      },
      error: err => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }


    onPageChange(event: any) {
    const page = (event.page ?? Math.floor(event.first / event.rows)) + 1;
    this.rows = event.rows;
    this.loadPage(page);
  }













  //  add product to wishlist
  addWishlist(product_id: string | number) {
    this._WishlistService.addWishlistItem(product_id).subscribe({
      next:(res)=>{
        // console.log(res);

        if (res.message === "Product added to wishlist") {

          this._ToastrService.success(res.message , "Euphoria Folks Pvt Ltd") ;
          this._WishlistService.WishListNumbers.set(res.total_items)
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
        this._CartService.CartNumbers.set(res.total_quantity) ;

      }

    },

    error:(err:HttpErrorResponse)=>{
      console.log(err);

    }
  })
}





































}
