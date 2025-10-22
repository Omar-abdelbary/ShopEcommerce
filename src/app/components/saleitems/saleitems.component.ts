import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { SaleitemsService } from '../../core/services/saleitems.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Isaleitem } from '../../core/interfaces/isaleitem';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-saleitems',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './saleitems.component.html',
  styleUrl: './saleitems.component.css',
})
export class SaleitemsComponent implements OnInit {
  private readonly _SaleitemsService = inject(SaleitemsService);
  AllItems: WritableSignal<Isaleitem[] | null> = signal([]);

  ngOnInit(): void {
    this._SaleitemsService.getAllItemsSale().subscribe({
      next: (res) => {
        console.log(res);
        this.AllItems.set(res.data);
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }








  // delete sale item
  deleteItem(id: number) {


    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the item.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        this._SaleitemsService.deleteSaleProduct(id).subscribe({
          next: (res) => {
            title: 'Deleted!';
            text: 'Item has been deleted successfully.';
            icon: 'success';
            timer: 1500;
            showConfirmButton: false;
            this.AllItems.set(res.data);
          },
          error: (err) => {
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong while deleting the item.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          },
        });
      }
    });
  }




  // add sale item
addProduct(): void {
  Swal.fire({
    title: 'Add Sale Item',
    html: `
      <input id="product_id" type="number" class="swal2-input" placeholder="Product ID">
      <input id="discount_percent" type="number" class="swal2-input" placeholder="Discount Percent (0-100)">
      <input id="start_date" type="date" class="swal2-input" placeholder="Start Date">
      <input id="end_date" type="date" class="swal2-input" placeholder="End Date">
      // <input id="main_image" type="text" class="swal2-input" placeholder="Main Image URL">

    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Add Product',
    preConfirm: () => {
      const product_id = +(document.getElementById('product_id') as HTMLInputElement).value;
      const discount_percent = +(document.getElementById('discount_percent') as HTMLInputElement).value;
      const start_date = (document.getElementById('start_date') as HTMLInputElement).value;
      const end_date = (document.getElementById('end_date') as HTMLInputElement).value;
      // const main_image = (document.getElementById('main_image') as HTMLInputElement).value;

      if (!product_id || product_id <= 0) Swal.showValidationMessage('Product ID must be positive');
      if (!discount_percent || discount_percent < 0 || discount_percent > 100) Swal.showValidationMessage('Discount percent must be 0-100');
      if (!start_date || !end_date) Swal.showValidationMessage('Please enter valid dates');
      // if (!main_image) Swal.showValidationMessage('Please enter image URL');

      return {
        product_id,
        discount_percent,
        start_date,
        end_date,
        // main_image
      };
    }
  }).then(result => {
    if (result.isConfirmed && result.value) {
      this._SaleitemsService.addSaleItem(result.value).subscribe({
        next: (res) => {

          Swal.fire('Success!', 'Product added successfully.', 'success') ,
          // console.log(res);

          this.AllItems.set(res.data)

        }  ,


        error: (err) => {
          console.error('Add error:', err);
          Swal.fire('Error!', err.error?.message || 'Failed to add product.', 'error');
        }
      });
    }
  });
}









}
