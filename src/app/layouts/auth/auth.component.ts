import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavauthComponent } from "../../components/navauth/navauth.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterOutlet,
    NavauthComponent,
    FooterComponent
],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
