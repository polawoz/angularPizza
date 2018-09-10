import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { DishListComponent } from './dish-list/dish-list.component';
import { DishListItemComponent } from './dish-list-item/dish-list-item.component';
import { AppRoutingModule } from './/app-routing.module';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import {FormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminDishesListComponent } from './admin-dishes-list/admin-dishes-list.component';
import { AdminDishesListItemComponent } from './admin-dishes-list-item/admin-dishes-list-item.component';
import { AdminOrdersListComponent } from './admin-orders-list/admin-orders-list.component';
import { AdminOrdersListItemComponent } from './admin-orders-list-item/admin-orders-list-item.component';
import { AdminDishesListItemDetailsComponent } from './admin-dishes-list-item-details/admin-dishes-list-item-details.component';
import { OrderListItemDetailsComponent } from './order-list-item-details/order-list-item-details.component';
import { AdminOrdersListItemDetailsComponent } from './admin-orders-list-item-details/admin-orders-list-item-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DishListComponent,
    DishListItemComponent,
    CartComponent,
    CartItemComponent,
    OrderSummaryComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent,
    HeaderComponent,
    AdminHomeComponent,
    AdminDishesListComponent,
    AdminDishesListItemComponent,
    AdminOrdersListComponent,
    AdminOrdersListItemComponent,
    AdminDishesListItemDetailsComponent,
    OrderListItemDetailsComponent,
    AdminOrdersListItemDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
