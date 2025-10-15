import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';


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

  totalCartItems :Signal<number> = computed( ()=>this._CartService.CartNumbers())




  ngOnInit(): void {


    this._CartService.getCart().subscribe({
      next:(res)=>{
        // console.log(res);
        this._CartService.CartNumbers.set(res.total_quantity) ;

      }
    })
  }




}
