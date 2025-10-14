import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Userdata } from '../../core/interfaces/userdata';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-userdata',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './userdata.component.html',
  styleUrl: './userdata.component.css'
})
export class UserdataComponent    implements OnInit {


  private readonly _AuthService = inject(AuthService) ;

  UserData:WritableSignal<Userdata | null> = signal(null) ;




  ngOnInit(): void {

    this._AuthService.getUserData().subscribe({
      next:(res)=>{
        // console.log(res);


        if (res.message === "Details retrieved successfully") {


          this.UserData.set(res.data) ;

        }


      },


      error:(err:HttpErrorResponse)=>{
        console.log(err);

      }
    })

  }
}
