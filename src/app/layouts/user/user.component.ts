import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavuserComponent } from "../../components/navuser/navuser.component";
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Iadmindata } from '../../core/interfaces/iadmindata';
import { DatePipe } from '@angular/common';
import { Userdata } from '../../core/interfaces/userdata';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RouterOutlet,
    NavuserComponent ,

],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent   {





}
