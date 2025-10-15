import { ProductComponent } from './components/product/product.component';
import { LoginadminComponent } from './components/loginadmin/loginadmin.component';
import { LoginuserComponent } from './components/loginuser/loginuser.component';
import { RegisteruserComponent } from './components/registeruser/registeruser.component';
import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { UserComponent } from './layouts/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { AllproductsComponent } from './components/allproducts/allproducts.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { AdminproductsComponent } from './components/adminproducts/adminproducts.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { AddimgComponent } from './components/addimg/addimg.component';
import { Component } from '@angular/core';
import { EditproductadminComponent } from './components/editproductadmin/editproductadmin.component';
import { CategoriesadminComponent } from './components/categoriesadmin/categoriesadmin.component';
import { AddcategoriesComponent } from './components/addcategories/addcategories.component';
import { ViewproductComponent } from './components/viewproduct/viewproduct.component';
import { EditcategoryadminComponent } from './components/editcategoryadmin/editcategoryadmin.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { SaleitemsComponent } from './components/saleitems/saleitems.component';
import { AdmindataComponent } from './components/admindata/admindata.component';
import { authGuard } from './core/guards/auth.guard';


export const routes: Routes = [
  {path:"" , component: AuthComponent  , children:[
    {path:"" , redirectTo:"register" , pathMatch:"full" , title:"register"} ,
    {path:"register" , component : RegisteruserComponent , title:"register"} ,
    {path:"loginUser" , component: LoginuserComponent , title:"loginUser"} ,
    {path:"loginAdmin" , loadComponent:()=> import("./components/loginadmin/loginadmin.component").then( (c)=>c.LoginadminComponent) , title:"loginAdmin"} ,
    {path:"forgetpassword" , loadComponent:()=> import("./components/forgetpassword/forgetpassword.component").then( (c)=>c.ForgetpasswordComponent) , title:"forgetpassword"}

  ]} ,


  {path:"" , component: UserComponent ,  children:[
    {path:"" , redirectTo:"home" , pathMatch:"full" , title:"home"} ,
    {path:"home" , loadComponent:()=> import('./components/home/home.component').then( (c)=>c.HomeComponent) , title:"home"} ,
    {path:"allproducts" , loadComponent:()=> import("./components/allproducts/allproducts.component").then( (c)=>c.AllproductsComponent), title:"allproducts"} ,
    {path: "cart" , loadComponent:()=> import("./components/cart/cart.component").then( (c)=>c.CartComponent), title:"cart" } ,
    {path:"wishlist" , loadComponent:()=> import("./components/wishlist/wishlist.component").then( (c)=>c.WishlistComponent) ,title:"wishlist" } ,
    {path:"categories" , loadComponent:()=> import("./components/categories/categories.component").then( (c)=>c.CategoriesComponent) ,  title :"categories" } ,
    {path:"category/:id" , loadComponent:()=> import("./components/category/category.component").then( (c)=>c.CategoryComponent) , title:"categoryDetails"} ,
    {path:"product/:id" , loadComponent:()=> import("./components/product/product.component").then( (c)=>c.ProductComponent) , title:"productDetails"} ,
    {path:"userdata" , loadComponent:()=> import("./components/userdata/userdata.component").then( (c)=>c.UserdataComponent ) , title:"UserData"} ,
    {path:"changepass" , loadComponent:()=> import("./components/changepass/changepass.component").then( (c)=>c.ChangepassComponent) , title:"change password"} ,
    {path:"receipt/:id" , loadComponent:()=>import("./components/receipt/receipt.component").then( (c)=>c.ReceiptComponent) , title:"receipt" } ,
    {path:"discountitems" , loadComponent:()=> import("./components/usersaleitem/usersaleitem.component").then( (c)=>c.UsersaleitemComponent) , title:"DiscountItems"} ,
  ]} ,

  {path: "" , component: AdminComponent , children:[
    {path:"" , redirectTo:"adminproducts" , pathMatch:"full" , title:"admin info"} ,
    {path:"adminproducts" , component:AdminproductsComponent , title:"AllProductsAdmin"} ,
    {path:"addproduct" ,  loadComponent:()=>import("./components/addproduct/addproduct.component").then( (c)=>c.AddproductComponent) , title:"addProduct"} ,
    {path:"addimg/:id" ,  loadComponent:()=>import("./components/addimg/addimg.component").then( (c)=>c.AddimgComponent) , title:"addImg"} ,
    {path:"editproduct/:id" ,  loadComponent:()=>import("./components/editproductadmin/editproductadmin.component").then( (c)=>c.EditproductadminComponent), title:"editProduct"} ,
    {path:"categoriesAdmin" , loadComponent:()=>import("./components/categoriesadmin/categoriesadmin.component").then( (c)=>c.CategoriesadminComponent) , title:"AllCategoriesAdmin" } ,
    {path:"addcategory" , loadComponent:()=> import("./components/addcategories/addcategories.component").then( (c)=>c.AddcategoriesComponent) , title:"AddCategory"} ,
    {path:"viewproduct/:id" ,loadComponent:()=>import("./components/viewproduct/viewproduct.component").then( (c)=>c.ViewproductComponent) , title :" viewProduct" } ,
    {path:"editcategory/:id" , loadComponent:()=> import("./components/editcategoryadmin/editcategoryadmin.component").then( (c)=>c.EditcategoryadminComponent) , title :"editCategory" } ,
    {path:"allorders" , loadComponent:()=> import("./components/allorders/allorders.component").then( (c)=>c.AllordersComponent), title :"Allorders" } ,
    {path:"saleitems" ,loadComponent:()=> import("./components/saleitems/saleitems.component").then( (c)=>c.SaleitemsComponent) , title:"SaleItems" } ,
    {path:"admindata" , loadComponent:()=> import("./components/admindata/admindata.component").then( (c)=>c.AdmindataComponent) , title:"AdminData" } ,

  ]} ,


  {path:"**" , loadComponent:(()=> import("./components/notfound/notfound.component").then( (c)=>c.NotfoundComponent) ) , title:"notfound"}
];
