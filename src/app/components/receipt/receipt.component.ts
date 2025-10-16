import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { sign } from 'crypto';
import { HttpErrorResponse } from '@angular/common/http';
import { Orderdetails } from '../../core/interfaces/orderdetails';
import { DatePipe, NgClass, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [
    NgClass ,
    DatePipe ,
    UpperCasePipe
  ],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent  implements OnInit {



  private readonly _ActivatedRoute = inject(ActivatedRoute) ;
  private readonly _CartService = inject(CartService) ;
  orderId:WritableSignal<string|number | null> = signal(null) ;
  orderDetails:WritableSignal<Orderdetails | null> = signal(null)


  ngOnInit(): void {
    console.log('Full URL:', window.location.href);

     this._ActivatedRoute.queryParamMap.subscribe({
    next: (params) => {
      const id = params.get('order_id');
      this.orderId.set(id);

      if (id) {
        this._CartService.orderDetails(id).subscribe({
          next: (res) => {
            console.log(res);
            this.orderDetails.set(res.data) ;
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
        });
      } else {
         console.log('⚠️ No order_id found in query params');
      }
    },
  });

  }
}
