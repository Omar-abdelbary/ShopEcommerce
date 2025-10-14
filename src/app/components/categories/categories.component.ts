import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Icategory } from '../../core/interfaces/icategory';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent   implements OnInit {



  private readonly _CategoriesService = inject(CategoriesService) ;
  private readonly _ToastrService = inject(ToastrService) ;
  AllCategories:WritableSignal<Icategory [] | null > = signal( null)  ;


  ngOnInit(): void {

    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        // console.log(res);
        if (res.message === "Category retrieved successfully") {


          this.AllCategories.set(res.data) ;
          // console.log(this.AllCategories());

        }

      },

      error:(err:HttpErrorResponse)=>{
        console.log(err);

      }
    })

  }

}
