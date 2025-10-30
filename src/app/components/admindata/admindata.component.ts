import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Iadmindata } from '../../core/interfaces/iadmindata';
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admindata',
  standalone: true,
  imports: [ DatePipe],
  templateUrl: './admindata.component.html',
  styleUrl: './admindata.component.css'
})
export class AdmindataComponent   implements OnInit {



  private readonly _DestroyRef = inject(DestroyRef) ;

  private readonly _AuthService = inject(AuthService) ;
  private readonly _ToastrService = inject(ToastrService) ;
  AdminData:WritableSignal<Iadmindata | null> = signal( null) ;

  ngOnInit(): void {

    this._AuthService.getAdminData().pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
      next:(res)=>{
        // console.log(res);

        if (res.message === "Details retrieved successfully") {

          this._ToastrService.success(res.message , "Euphoria Folks Pvt Ltd") ;
          this.AdminData.set(res.data) ;
          // console.log(this.AdminData());


        }

      },

      error:(err:HttpErrorResponse)=>{
        console.log(err);

      }
    })

  }
}
