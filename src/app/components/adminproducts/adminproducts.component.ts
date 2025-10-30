import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { AllproductsService } from '../../core/services/allproducts.service';
import { Iproducts } from '../../core/interfaces/iproducts';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-adminproducts',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './adminproducts.component.html',
  styleUrl: './adminproducts.component.css',
})
export class AdminproductsComponent implements OnInit {
  private readonly _AllproductsService = inject(AllproductsService);
  private readonly _ToastrService = inject(ToastrService);

  private readonly _DestroyRef = inject(DestroyRef) ;

  Allproducts: WritableSignal<Iproducts[]> = signal([]);



  ngOnInit(): void {
    this._AllproductsService.getAllProducts().pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
      next: (res) => {
        // console.log(res);

        this.Allproducts.set(res.data);
        // this._ToastrService.success(res.message , "Euphoria Folks Pvt Ltd") ;
      },

      error(err: HttpErrorResponse) {
        console.log(err);
      },
    });
  }

  delete(productId: String | number) {
     this._AllproductsService.deleteProduct(productId).pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
        next: (res) => {
          this._ToastrService.success(res.message, 'Euphoria Folks Pvt Ltd');

          this.Allproducts.update((products) =>
            products.filter((p) => p.product_id !== productId)
          );
        },

        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
  }


}
