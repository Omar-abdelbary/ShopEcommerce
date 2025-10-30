import { ToastrService } from 'ngx-toastr';
import { Component, DestroyRef, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { HttpErrorResponse } from '@angular/common/http';

import { Icategory } from '../../core/interfaces/icategory';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-categoriesadmin',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './categoriesadmin.component.html',
  styleUrl: './categoriesadmin.component.css'
})
export class CategoriesadminComponent   implements OnInit  {


   private readonly _CategoriesService = inject(CategoriesService) ;
  private readonly _ToastrService = inject(ToastrService) ;
  private readonly _DestroyRef = inject(DestroyRef) ;

  AllCategories :WritableSignal<Icategory[]> = signal([]) ;






  ngOnInit(): void {

     this._CategoriesService.getAllCategories().pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
      next:(res)=>{
      

        this.AllCategories.set(res.data) ;

      },

      error:(err:HttpErrorResponse)=>{
        console.log(err);

      }
    })

  }





  // delete category

  delete(categoryId:string |number) {
    this._CategoriesService.deleteCategory(categoryId).pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
      next:(res)=>{



        if (res.message === "Category deleted successfully") {
          this._ToastrService.success(res.message , "Euphoria Folks Pvt Ltd") ;
          this.AllCategories.set(res.data) ;
        }
      },


      error:(err:HttpErrorResponse)=>{
        console.log(err);

      }
    })
  }






}
