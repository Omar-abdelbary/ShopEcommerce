import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navuser',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navuser.component.html',
  styleUrl: './navuser.component.css'
})
export class NavuserComponent {


  readonly _AuthService = inject(AuthService) ;

}
