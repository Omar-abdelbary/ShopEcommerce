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



   currentPage = signal(1);
  totalItems = signal(0);
  limit = signal(10);
  totalPages = signal(0);
  isLoading = signal(false);



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



     this.getProducts();

  }




    getProducts() {
    this.isLoading.set(true);

    this._AllproductsService.getAllProduct( this.currentPage() , this.limit())
      .subscribe({
        next: (res: any) => {
          this.Allproducts.set(res.data);
          this.totalItems.set(res.total_items);
          this.totalPages.set(Math.ceil(res.total_items / this.limit()));
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.isLoading.set(false);
        },
      });
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((old) => old + 1);
      this.getProducts();
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((old) => old - 1);
      this.getProducts();
    }
  }

  changeLimit(event: Event) {
    const value = Number((event.target as HTMLSelectElement).value);
    this.limit.set(value);
    this.currentPage.set(1);
    this.getProducts();
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
