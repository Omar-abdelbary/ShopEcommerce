import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllproductsService } from '../../core/services/allproducts.service';
import { Specificproduct } from '../../core/interfaces/specificproduct';
import {
  CurrencyPipe,
  DatePipe,
  isPlatformBrowser,
  NgClass,
} from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Iproductsimages } from '../../core/interfaces/iproductsimages';
import { ReviewService } from '../../core/services/review.service';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Ireview } from '../../core/interfaces/ireview';
import Swal from 'sweetalert2';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CurrencyPipe,
    CarouselModule,
    ReactiveFormsModule,
    DatePipe,
    NgClass,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _AllproductsService = inject(AllproductsService);
  private readonly _ReviewService = inject(ReviewService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _CartService = inject(CartService) ;

  ProductDetails: WritableSignal<Specificproduct | null> = signal(null);
  productImages: WritableSignal<Iproductsimages[]> = signal([]);
  productId: WritableSignal<string | number | null> = signal('');
  reviewItems: WritableSignal<Ireview[] | null> = signal(null);
  averageRating = signal<number>(0);

  ngOnInit(): void {
    // get productId
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        // console.log(p);

        // let ProductId = p.get("id") ;
        this.productId.set(p.get('id'));

        // get product details
        this._AllproductsService.getProductById(this.productId()).subscribe({
          next: (res) => {
            this.ProductDetails.set(res.data);
            this.productImages.set(res.data.images);
            // console.log(this.ProductDetails ());
          },

          error(err: HttpErrorResponse) {
            console.log(err);
          },
        });



        // get all review product
        this._ReviewService.getAllReviewProduct(this.productId()).subscribe({
          next: (res) => {
            // console.log(res);
            if (res.message === 'Reviews retrieved successfully') {
              this.reviewItems.set(res.data);
              // console.log(this.reviewItems());

              if (res.data.length > 0) {
                const total = res.data.reduce(
                  (sum: number, item: any) => sum + Number(item.rating),
                  0
                );
                const avg = Number((total / res.data.length).toFixed(1));
                this.averageRating.set(avg);
              } else {
                this.averageRating.set(0);
              }
            }
          },

          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
        });
      },
    });
  }


  // add item to cart
   addProduct(productId:string|number ) {
    this._CartService.addCart(productId).subscribe({
      next:(res)=>{
        // console.log(res);
          if (res.message === "Item added to cart") {


        this._ToastrService.success(res.message , "Euphoria Folks Pvt Ltd") ;
        this._CartService.CartNumbers.set(res.total_quantity) ;

      }

      },

      error:(err:HttpErrorResponse)=>{
        console.log(err);

      }
    })
  }

  // form add review

  addReviewForm: FormGroup = this._FormBuilder.group({
    rating: [
      null,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ],
    ],
    comment: [
      null,
      [Validators.required, Validators.minLength(10), Validators.maxLength(50)],
    ],
  });

  addReviewSubmit() {
    if (this.addReviewForm.valid) {
      this._ReviewService
        .AddReview(this.productId(), this.addReviewForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.message === 'Review created successfully') {
              this._ToastrService.success(
                res.message,
                'Euphoria Folks Pvt Ltd'
              );
              const newReview = res.data;

              // تحديث القائمة بإضافة الجديد فوق القديم
              this.reviewItems.update((prev) => [newReview, ...(prev ?? [])]);
            }
          },

          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
        });
    } else {
      this.addReviewForm.markAllAsTouched();
    }
  }

  // edit review

  editReview(reviewId: string | number | null) {
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
        const ratingInput = document.getElementById(
          'rating'
        ) as HTMLInputElement | null;
        const commentInput = document.getElementById(
          'comment'
        ) as HTMLTextAreaElement | null;

        const rating = ratingInput?.value;
        const comment = commentInput?.value;

        if (!rating || !comment) {
          Swal.showValidationMessage('Please enter both rating and comment');
          return false;
        }

        return { rating: +rating, comment: comment.trim() };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const payload = {
          rating: result.value.rating,
          comment: result.value.comment,
        };

        this._ReviewService.updateReview(reviewId, payload).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Review updated!',
              text: 'Your review has been successfully saved.',
              timer: 1500,
              showConfirmButton: false,
            });
            // console.log(res);
            // ممكن تحدث الريفيوهات هنا
            this.reviewItems.update((reviews) => {
              if (!reviews) return reviews;
              return reviews.map((review) =>
                review.review_id === reviewId
                  ? { ...review, ...payload }
                  : review
              );
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to update review. Please try again.',
            });
            console.error(err);
          },
        });
      }
    });
  }

  // delete review
  deleteReview(reviewId: string | number | null) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to recover this review!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        this._ReviewService.deleteReview(reviewId).subscribe({
          next: (res) => {
            Swal.fire({
              title: 'Deleted!',
              text: 'The review has been deleted successfully ✅',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            // لو عندك لستة ريفيوهات، شيل الريفيو المحذوف منها بدون ريلود
            this.reviewItems.update((oldReviews) =>
              (oldReviews ?? []).filter((r: any) => r.review_id !== reviewId)
            );
          },
          error: (err) => {
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong while deleting ❌',
              icon: 'error',
              confirmButtonText: 'OK',
            });
            console.log(err);
          },
        });
      }
    });
  }

  // owl-Carousel

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
}
