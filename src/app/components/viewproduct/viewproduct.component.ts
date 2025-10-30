import { Iproduct } from './../../core/interfaces/iproduct';
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllproductsService } from '../../core/services/allproducts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { Iproductsimages } from '../../core/interfaces/iproductsimages';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ReviewService } from '../../core/services/review.service';
import { Ireview } from '../../core/interfaces/ireview';
import Swal from 'sweetalert2';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-viewproduct',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, CarouselModule],
  templateUrl: './viewproduct.component.html',
  styleUrl: './viewproduct.component.css',
})
export class ViewproductComponent implements OnInit {




  // owl carousel
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    rtl: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 2000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };

  private readonly _DestroyRef = inject(DestroyRef) ;
  private readonly _PLATFORM_ID = inject(PLATFORM_ID) ;
  private readonly _ReviewService = inject(ReviewService);
  private readonly _Router = inject(Router); // سيرفس للراوتر للتعامل مع التنقل برمجي للكمبوننت تاني
  private readonly _AllproductsService = inject(AllproductsService); // سيرفس فيها اللي بكلم فيها الايند بوينت بتاع الكمبوننت دا
  private readonly _ActivatedRoute = inject(ActivatedRoute); // علشان اقدر اجيب حاجة من الurl زي الid مثلا
  private readonly _ToastrService = inject(ToastrService); // للتعامل مع مثلا لو عاوز تظهر رسالة لليوزر علي حاجة معينة فبتستخدم حاجة زي دي مثلا
  ProductId: WritableSignal<string | null> = signal(''); // الid للمنتج
  mainImg: WritableSignal<string> = signal(''); // بخزن فيها الصورة اللي جاية من الباك ايند للمنتج
  productImages: WritableSignal<Iproductsimages[]> = signal([]); // بخزن الصور اللي جاية للمنتج بحيث هستخدمها
  AllReview:WritableSignal<Ireview[] | null> = signal(null) ; // هناخد كل الريفيوز بتاعت المنتج
  productInfo: Iproduct | null = null; // فية كل حاجة عن المنتج البربيرتي دا

  // اول لما تدخل الكمبوننت بينفذن انه بيجيب معلومات عن المنتج ويعرضها فحاطط دا هنا جوا الng oninit
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        // console.log(p.get("id"));

        this.ProductId.set(p.get('id'));
        // console.log(this.ProductId());

        this._AllproductsService.getProductById(this.ProductId()).pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
          next: (res) => {
            // console.log(res);

            if (res.message === 'Product retrieved successfully') {
              // this._ToastrService.success(res.message , "Euphoria Folks Pvt Ltd") ;

              this.productInfo = res.data;
              this.mainImg.set(res.data.main_image);
              this.productImages.set(res.data.images);
              // console.log(this.productInfo);

              // this.productInfo.set(res.data) ;
              // console.log(this.productInfo());
            }
          },

          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
        });



        // get all review items
        this._ReviewService.getAllReviewProduct(this.ProductId()).pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
          next:(res)=>{
            // console.log(res);
            this.AllReview.set(res.data) ;
          },

          error:(err:HttpErrorResponse)=>{
            console.log(err);

          }
        })
      },
    });
  }





  editReview(reviewID:string| number |null) {
    // تأكد إن الكود دا يشتغل فقط في المتصفح (مش على السيرفر)
    if (!isPlatformBrowser(this._PLATFORM_ID)) return;

    Swal.fire({
      title: 'Edit your review',
      html: `
        <div style="text-align: left;">
          <label for="rating" style="font-weight:600;">Rating:</label>
          <input id="rating" type="number" min="1" max="5" class="swal2-input" placeholder="1 - 5">
          <label for="comment" style="font-weight:600;">Comment:</label>
          <textarea id="comment" class="swal2-textarea" placeholder="Write your comment..."></textarea>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const ratingInput = document.getElementById('rating') as HTMLInputElement | null;
        const commentInput = document.getElementById('comment') as HTMLTextAreaElement | null;

        const rating = ratingInput?.value;
        const comment = commentInput?.value;

        if (!rating || !comment) {
          Swal.showValidationMessage('Please enter both rating and comment');
          return false;
        }

        return { rating: +rating, comment: comment.trim() };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const payload = {
          rating: result.value.rating,
          comment: result.value.comment
        };

        this._ReviewService.updateReview(reviewID, payload).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Review updated!',
              text: 'Your review has been successfully saved.',
              timer: 1500,
              showConfirmButton: false
            });
            console.log(res);
            // ممكن تحدث الريفيوهات هنا
            // this.getAllReviews();
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to update review. Please try again.'
            });
            console.error(err);
          }
        });
      }
    });
  }































}
