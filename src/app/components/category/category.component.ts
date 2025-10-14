import { Icategory } from './../../core/interfaces/icategory';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent    implements OnInit {



  private readonly _ActivatedRoute = inject(ActivatedRoute ) ;
  private readonly _CategoriesService = inject(CategoriesService) ;
    CategoryDetails : Icategory = {} as Icategory ;




  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        // console.log(p);

        let CategoryId = p.get("id") ;



        this._CategoriesService.getSpecificCategoryById(CategoryId ).subscribe({

          next:(res)=>{
            // console.log(res.data);
            this.CategoryDetails = res.data ;
            // console.log( this.CategoryDetails);


          } ,
          error(err :HttpErrorResponse) {
            console.log(err);

          },
        })


      }
    }) ;


  }


































































}
