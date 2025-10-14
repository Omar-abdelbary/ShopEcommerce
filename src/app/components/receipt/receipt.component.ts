import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { sign } from 'crypto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent  implements OnInit {



  private readonly _ActivatedRoute = inject(ActivatedRoute) ;
  private readonly _CartService = inject(CartService) ;
  orderId:WritableSignal<string|number | null> = signal(null) ;

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        // console.log(p.get("id"));

        this.orderId.set(p.get("id"))



        this._CartService.orderDetails(this.orderId()).subscribe({
          next:(res)=>{
            console.log(res);

          },

          error:(err:HttpErrorResponse)=>{
            console.log(err);

          }
        })
      }
    })

  }
}
