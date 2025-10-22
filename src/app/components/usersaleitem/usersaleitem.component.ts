import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { SaleitemsService } from '../../core/services/saleitems.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Isaleitem } from '../../core/interfaces/isaleitem';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-usersaleitem',
  standalone: true,
  imports: [ CurrencyPipe],
  templateUrl: './usersaleitem.component.html',
  styleUrl: './usersaleitem.component.css',
})
export class UsersaleitemComponent implements OnInit {
  private readonly _SaleitemsService = inject(SaleitemsService);

  AllItems: WritableSignal<Isaleitem[] | null> = signal(null);




  ngOnInit(): void {






    this._SaleitemsService.getAllItemsSale().subscribe({
      next: (res) => {
        // console.log(res);

        if (res.message === "Sale items retrieved successfully") {

          this.AllItems.set(res.data) ;
          // console.log(this.AllItems());


        }
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }





}
