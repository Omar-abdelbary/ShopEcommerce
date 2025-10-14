import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../core/services/categories.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcategories',
  standalone: true,
  imports: [
    ReactiveFormsModule ,
    NgClass ,
  ],
  templateUrl: './addcategories.component.html',
  styleUrl: './addcategories.component.css'
})
export class AddcategoriesComponent {

  private readonly _FormBuilder = inject(FormBuilder) ;
  private readonly _CategoriesService = inject(CategoriesService) ;
  private readonly _Router = inject(Router) ;


  addCategoriesForm:FormGroup  = this._FormBuilder.group({

    name : [null , [Validators.required , Validators.minLength(5) , Validators.maxLength(25)]] ,
    description : [null , [Validators.required, Validators.minLength(5) , Validators.maxLength(30)] ] ,
    image_url: [null , [Validators.required , Validators.pattern(/^https?:\/\/.+/i)]] ,
  }) ;



  AddCategoriesSubmit() {

    if (this.addCategoriesForm.valid) {

      this._CategoriesService.AddCategory(this.addCategoriesForm.value).subscribe({
        next:(res)=>{
          console.log(res);


          if (res.message === "Category created successfully") {

            this._Router.navigate(["/categoriesAdmin"])
          }

        },

        error:(err:HttpErrorResponse) =>{
          console.log(err);

        }
      })

    } else {

      this.addCategoriesForm.markAllAsTouched()
    }
  }

}
