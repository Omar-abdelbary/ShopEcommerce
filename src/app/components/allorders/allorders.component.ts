import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { AllordersService } from '../../core/services/allorders.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Iorder } from '../../core/interfaces/iorder';
import Swal from 'sweetalert2';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [ CurrencyPipe , DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {
  private readonly _AllordersService = inject(AllordersService);
  private readonly _ToastrService = inject(ToastrService);

  Allorders: WritableSignal<Iorder[] | null> = signal(null);

  ngOnInit(): void {
    this._AllordersService.getAllorderAdmin().subscribe({
      next: (res) => {
        console.log(res);

        if (res.message === 'Orders retrieved successfully') {
          this.Allorders.set(res.data);
          // console.log(this.Allorders());

          this._ToastrService.success(res.message, 'Euphoria Folks Pvt Ltd');
        }
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  showOrderDetails(orderId: number) {
    this._AllordersService.getDetailsOrderAdmin(orderId).subscribe({
      next: (res) => {
        const order = res.data;
        Swal.fire({
          title: `Order #${order.order_id}`,
          html: `
            <div style="text-align:left; font-size:14px">
              <p><b>Status:</b> ${order.status}</p>
              <p><b>Total:</b> ${order.total_amount} EGP</p>
              <p><b>Created:</b> ${new Date(
                order.created_at
              ).toLocaleString()}</p>
              <hr>
              <b>Items:</b>
              <ul style="padding-left:16px; margin-top:6px">
                ${
                  order.items
                    ?.map(
                      (item: any) => `
                  <li>${item.product_name} — ${item.quantity} × ${item.price} GBP</li>
                `
                    )
                    .join('') || '<li>No items</li>'
                }
              </ul>
            </div>
          `,
          background: '#1e1e2f', // لون الخلفية
          color: '#fff', // لون الكتابة
          showConfirmButton: true,
          confirmButtonColor: '#007bff', // لون زرار الـ OK
          width: '500px',
          // border: '2px solid #007bff',
          customClass: {
            popup: 'my-swal-popup', // نربطها بكلاس نتحكم فيه بالـ CSS
          },
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to fetch order details.',
        });
      },
    });
  }
}
