import { Component, inject, OnInit } from '@angular/core';
import { SaleitemsService } from '../../core/services/saleitems.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-saleitems',
  standalone: true,
  imports: [],
  templateUrl: './saleitems.component.html',
  styleUrl: './saleitems.component.css'
})
export class SaleitemsComponent   implements OnInit {

  private readonly _SaleitemsService = inject(SaleitemsService) ;






  ngOnInit(): void {

    this._SaleitemsService.getAllItemsSale().subscribe({
      next:(res)=>{
        console.log(res);

      },

      error:(err:HttpErrorResponse)=>{
        console.log(err);

      }
    })

  }
}
