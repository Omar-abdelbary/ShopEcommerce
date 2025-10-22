import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Iitemcart } from '../../core/interfaces/iitemcart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { animate, style, transition, trigger } from '@angular/animations';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
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
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  AllItems: WritableSignal<Iitemcart[] | null> = signal(null);
  TotalPrice: WritableSignal<string | number> = signal('');

  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next: (res) => {
        // console.log(res);

        if (res.message === 'Cart retrieved successfully') {
          this.AllItems.set(res.data);
          // console.log(this.AllItems());
          this.TotalPrice.set(res.total_price);
          this._CartService.CartNumbers.set(res.total_quantity) ;
        }
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  // remove all items
  removeAllItems() {
    this._CartService.deleteAllItems().subscribe({
      next: (res) => {
        // console.log(res);

        if (res.message === 'All items removed from cart') {
          this.AllItems.set([]);
          this.TotalPrice.set('0');
          this._ToastrService.success(res.message, 'Euphoria Folks Pvt Ltd');
          this._CartService.CartNumbers.set(0) ;
        }
      },

      error: (err: HttpHeaderResponse) => {
        console.log(err);
      },
    });
  }

  // remove item
  removeItem(cartId: string | number) {
    this._CartService.deleteItem(cartId).subscribe({
      next: (res) => {
        if (res.message === 'Cart item removed successfully') {
          this._CartService.CartNumbers.update(n => n - 1) ;
          // ✅ نتأكد إن AllItems مش null قبل الفلترة
          const currentItems = this.AllItems() || [];
          const updated = currentItems.filter((i) => i.cart_item_id !== cartId);
          this.AllItems.set(updated);

          this._ToastrService.success(res.message, 'Euphoria Folks Pvt Ltd');

          // ✅ نحسب التوتال من جديد
          const newTotal = updated.reduce(
            (sum, item) =>
              sum + Number(item.final_price) * Number(item.quantity),
            0
          );
          this.TotalPrice.set(newTotal);
        }
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  // update quantity

  updateQuantity(
    cartId: string | number,
    productId: string | number,
    quantity: number | string
  ) {
    this._CartService.updateCartItem(cartId, productId, quantity).subscribe({
      next: (res) => {
        // console.log(res);

        if (res.message === "Cart item updated successfully") {

          this._ToastrService.success(res.message , "Euphoria Folks Pvt Ltd") ;
          this.AllItems.set(res.data)  ;

               // ✅ تحدّث التوتال على طول بناءً على الريسبونس
        this.TotalPrice.set(res.total_price);
        // this.totalQuantity.set(res.total_quantity);

        }
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }





  // payment details

  payment() {
    this._CartService.paymentByVisa().subscribe({
      next:(res)=>{
        console.log(res);

        if (res.message === "Payment session url has been created") {

          window.open(res.url , "_self") ;
          this._ToastrService.success(res.message , "Euphoria Folks Pvt Ltd") ;

        }

      },

      error:(err:HttpErrorResponse)=>{
        console.log(err);

      }
    })
  }










}
