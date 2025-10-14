import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { HttpErrorResponse } from '@angular/common/http';

import { Icategory } from '../../core/interfaces/icategory';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categoriesadmin',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './categoriesadmin.component.html',
  styleUrl: './categoriesadmin.component.css'
})
export class CategoriesadminComponent   implements OnInit , OnDestroy {


   private readonly _CategoriesService = inject(CategoriesService) ;
  private readonly _ToastrService = inject(ToastrService) ;

  AllCategories :WritableSignal<Icategory[]> = signal([]) ;

  unAllCategories!:Subscription




  ngOnInit(): void {

  this.unAllCategories =   this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        // console.log(res);
        // this._ToastrService.success(res.message , "Euphoria Folks Pvt Ltd") ;

        this.AllCategories.set(res.data) ;

      },

      error:(err:HttpErrorResponse)=>{
        console.log(err);

      }
    })

  }





  // delete category

  delete(categoryId:string |number) {
    this._CategoriesService.deleteCategory(categoryId).subscribe({
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





  ngOnDestroy(): void {
    this.unAllCategories?.unsubscribe() ;
  }
}
