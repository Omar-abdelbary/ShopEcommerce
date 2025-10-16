import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Iwishlist } from '../../core/interfaces/iwishlist';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
   animations: [
      trigger('fadeIn', [
        transition(':enter', [
          style({ opacity: 0, transform: 'translateY(30px) scale(0.95)' }),
          animate(
            '600ms cubic-bezier(0.25, 1, 0.5, 1)',
            style({ opacity: 1, transform: 'translateY(0) scale(1)' })
          ),
        ]),
        transition(':leave', [
          animate(
            '300ms ease-in',
            style({ opacity: 0, transform: 'translateY(20px) scale(0.9)' })
          ),
        ]),
      ]),
    ],
})
export class WishlistComponent implements OnInit {





  private readonly _WishlistService = inject(WishlistService);

  private readonly _ToastrService = inject(ToastrService);

  AllItems: WritableSignal<Iwishlist[] | null> = signal(null);





  // get all items in the component careation
  ngOnInit(): void {
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        console.log(res);

        if (res.message === 'Wishlist retrieved successfully') {
          this.AllItems.set(res.data);
          this._WishlistService.WishListNumbers.set(res.total_items) ;
        }
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }






  // delete item in the wishlist
  removeItem(itemId: number) {
    this._WishlistService.deleteItem(itemId).subscribe({
      next: (res) => {
        // console.log(res);
        if (res.message === 'Product removed from wishlist') {
          this._ToastrService.success(res.message, 'Euphoria Folks Pvt Ltd');

          this.AllItems.set(res.data);
          this._WishlistService.WishListNumbers.set(res.total_items) ;
        }
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }






  // delete all items in the wishlist
  removeAllitems() {
    this._WishlistService.deleteAllItems().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === 'Wishlist cleared successfully') {
          this._ToastrService.success(res.message, 'Euphoria Folks Pvt Ltd');
          this.AllItems.set(res);
          this._WishlistService.WishListNumbers.set(0) ;
        }
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }








}
