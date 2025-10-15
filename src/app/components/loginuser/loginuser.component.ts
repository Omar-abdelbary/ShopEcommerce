import { ToastrService } from 'ngx-toastr';
import { Component, DestroyRef, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-loginuser',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './loginuser.component.html',
  styleUrl: './loginuser.component.css',
})
export class LoginuserComponent {


   readonly #destoryREf = inject(DestroyRef);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  private readonly _AuthService = inject(AuthService);
  private readonly _ToastrService = inject(ToastrService);

  loginAsUserForm: FormGroup = this._FormBuilder.group({
    email: [
      null,
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$'),
      ],
    ],
    password: [null, [Validators.required, Validators.pattern('^\\d{6,}$')]],
  });

  loginUserSubmit() {
    if (this.loginAsUserForm.valid) {
      this._AuthService.loginAsUser(this.loginAsUserForm.value).pipe(takeUntilDestroyed(this.#destoryREf)).subscribe({
        next: (res) => {
          // console.log(res);

          if (res.message === 'Login successful') {
            this._ToastrService.success(res.message, 'Euphoria Folks Pvt Ltd');
            localStorage.setItem('userToken', res.data.token);
            this._AuthService.Token();
            

            setTimeout(() => {
              this._Router.navigate(['/home']);
            }, 1000);
          }
        },

        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    } else {
      this.loginAsUserForm.markAllAsTouched();
    }
  }
}
