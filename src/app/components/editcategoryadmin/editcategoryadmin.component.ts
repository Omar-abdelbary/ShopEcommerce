import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../core/services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editcategoryadmin',
  standalone: true,
  imports: [
    ReactiveFormsModule ,
    NgClass ,
  ],
  templateUrl: './editcategoryadmin.component.html',
  styleUrl: './editcategoryadmin.component.css'
})
export class EditcategoryadminComponent  implements OnInit {


   private readonly _CategoriesService = inject(CategoriesService) ;
   private readonly _ToastrService = inject(ToastrService) ;
  private readonly _FormBuilder = inject(FormBuilder) ;
  private readonly _Router = inject(Router) ;
  private readonly _ActivatedRoute = inject(ActivatedRoute) ;

  CategoryId :WritableSignal<string | null> = signal("")


  // هنا بجيب الid بتاع الcategoryاول لما بدخل الكمبوننت من الurl

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        // console.log(p.get("id"));
        this.CategoryId.set(p.get("id")) ;

      }
    })

  }




  EditCategoryForm: FormGroup = this._FormBuilder.group({
    name : [null , [Validators.required , Validators.minLength(10) , Validators.maxLength(15)]] ,
    description : [null , [Validators.required , Validators.minLength(10) , Validators.maxLength(35)]] ,
    image_url : [ null , [Validators.required , Validators.pattern(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg)$/i)]]
  }) ;


  EditCategorySubmit() {

    if (this.EditCategoryForm.valid) {

      this._CategoriesService.UpdateCategory(this.CategoryId() , this.EditCategoryForm.value).subscribe({
        next:(res)=>{
          // console.log(res);

          if (res.message === "Category updated successfully") {

            this._ToastrService.success(res.message  , "Euphoria Folks Pvt Ltd") ;

            this._Router.navigate(["/categoriesAdmin"])
          }

        },

        error:(err:HttpErrorResponse)=>{
          console.log(err);

        }
      })

    } else {


      this.EditCategoryForm.markAllAsTouched()
    }
  }




}
