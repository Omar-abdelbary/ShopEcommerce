import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavauthComponent } from "../../components/navauth/navauth.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterOutlet,
    NavauthComponent
],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
