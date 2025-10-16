import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';


@Component({
  selector: 'app-navuser',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navuser.component.html',
  styleUrl: './navuser.component.css'
})
export class NavuserComponent  implements OnInit {


  readonly _AuthService = inject(AuthService) ;
  private readonly _CartService = inject(CartService) ;
  private readonly _WishlistService = inject(WishlistService)  ;

  totalCartItems :Signal<number> = computed( ()=>this._CartService.CartNumbers()) ;
  totalWishlistItems :Signal<number> = computed( ()=>this._WishlistService.WishListNumbers()) ;




  ngOnInit(): void {


    // get counter of cart items
    this._CartService.getCart().subscribe({
      next:(res)=>{
        // console.log(res);
        this._CartService.CartNumbers.set(res.total_quantity) ;

      }
    }) ;



    this._WishlistService.getWishlist().subscribe({
      next:(res)=>{
        this._WishlistService.WishListNumbers.set(res.total_items) ;
      }
    })
  }




}
