import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories.service';

import { Icategory } from '../../core/interfaces/icategory';
import { AllproductsService } from '../../core/services/allproducts.service';
import { Iproducts } from '../../core/interfaces/iproducts';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { SaleitemsService } from '../../core/services/saleitems.service';
import { Isaleitem } from '../../core/interfaces/isaleitem';
import { AuthService } from '../../core/services/auth.service';
import { take } from 'rxjs';
import gsap from 'gsap';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, CurrencyPipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _AllproductsService = inject(AllproductsService);
  private readonly _SaleitemsService = inject(SaleitemsService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _DestroyRef = inject(DestroyRef) ;

  AllCategories: WritableSignal<Icategory[]> = signal([]);
  AllProducts: WritableSignal<Iproducts[]> = signal([]);
  AllItems: WritableSignal<Isaleitem[] | null> = signal(null);

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayHoverPause: true,
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

  customOptionsNew: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 2000,
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 5,
      },
      940: {
        items: 5,
      },
    },
    nav: false,
  };

  customOptionsCategories: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 4,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

  ngOnInit(): void {
    //   get token from url
    // this._ActivatedRoute.queryParams.pipe(take(1)).subscribe((params) => {
    //   const token = params['token'];
    //   if (token) {
    //     localStorage.setItem('userToken', token);

    //     setTimeout(() => {
    //       this._AuthService.Token();
    //       this._Router.navigate([], { queryParams: {}, replaceUrl: true });
    //     }, 0);
    //   }
    // });

    // get allcategories
    this._CategoriesService.getAllCategories().pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
      next: (res) => {
        // console.log(res.data);
        this.AllCategories.set(res.data);
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });

    // get all products
    this._AllproductsService.getAllProducts().pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
      next: (res) => {
        this.AllProducts.set(res.data);
        // console.log(this.AllProducts());
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });

    // get all sale items

    this._SaleitemsService.getAllItemsSale().pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
      next: (res) => {
        // console.log(res);
        if (res.message === 'Sale items retrieved successfully') {
          this.AllItems.set(res.data);
          // console.log(this.AllItems());
        }
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  // add item to wishlist
  additemWishlist(productId: number) {
    this._WishlistService.addWishlistItem(productId).pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
      next: (res) => {
        // console.log(res);

        if (res.message === 'Product added to wishlist') {
          this._ToastrService.success(res.message, 'Euphoria Folks Pvt Ltd');
          this._WishlistService.WishListNumbers.set(res.total_items);
        }
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  // add item to cart

  addProduct(productId: string | number) {
    this._CartService.addCart(productId).pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
      next: (res) => {
        // console.log(res);
        if (res.message === 'Item added to cart') {
          this._ToastrService.success(res.message, 'Euphoria Folks Pvt Ltd');
          this._CartService.CartNumbers.set(res.total_quantity);
        }
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }


}
