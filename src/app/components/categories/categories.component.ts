import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Icategory } from '../../core/interfaces/icategory';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private readonly _DestroyRef = inject(DestroyRef) ;
  AllCategories:WritableSignal<Icategory [] | null > = signal( null)  ;


  ngOnInit(): void {

    this._CategoriesService.getAllCategories().pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
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
