import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { DishListComponent } from './dish-list/dish-list.component';
import { AppRoutingModule } from './/app-routing.module';
import { CartComponent } from './cart/cart.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminDishesListComponent } from './admin-dishes-list/admin-dishes-list.component';
import { AdminOrdersListComponent } from './admin-orders-list/admin-orders-list.component';
import { AdminDishesListItemDetailsComponent } from './admin-dishes-list-item-details/admin-dishes-list-item-details.component';
import { AdminOrdersListItemDetailsComponent } from './admin-orders-list-item-details/admin-orders-list-item-details.component';
import { OrderDetailsFormComponent } from './order-details-form/order-details-form.component';
import { OrderSummaryMessageComponent } from './order-summary-message/order-summary-message.component';

@NgModule({
  declarations: [
    AppComponent,
    DishListComponent,
    CartComponent,
    OrderSummaryComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent,
    HeaderComponent,
    AdminHomeComponent,
    AdminDishesListComponent,
    AdminOrdersListComponent,
    AdminDishesListItemDetailsComponent,
    AdminOrdersListItemDetailsComponent,
    OrderDetailsFormComponent,
    OrderSummaryMessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
