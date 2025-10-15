import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const _PLATFORM_ID = inject(PLATFORM_ID);


  console.log('Interceptor working ✅');



  if (isPlatformBrowser(_PLATFORM_ID)) {



     if (localStorage.getItem('userToken') !== null) {

      console.log('Token added to header 👉', localStorage.getItem("userToken"));

      if (
        req.url.includes('getUserDetails') ||
        req.url.includes('changePassword') ||
        req.url.includes('updateProfile') ||
        req.url.includes('admin') ||
        req.url.includes('categories') ||
        req.url.includes('products') ||
        req.url.includes('orders') ||
        req.url.includes('brands') ||
        req.url.includes('coupons') ||
        req.url.includes('products') ||
        req.url.includes('images') ||
        req.url.includes('orders') ||
        req.url.includes('cart') ||
        req.url.includes('reviews') ||
        req.url.includes('saleItems') ||
        req.url.includes('wishlist') ||
        req.url.includes('create-checkout-session')
      ) {
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
        });
      }
    }

  }


  return next(req);
};
