import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderSummaryComponent} from './order-summary/order-summary.component';
import {LoginComponent} from './login/login.component';
import {MenuComponent} from './menu/menu.component';
import {HomeComponent} from './home/home.component';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {AdminDishesListComponent} from './admin-dishes-list/admin-dishes-list.component';
import {AdminOrdersListComponent} from './admin-orders-list/admin-orders-list.component';
import {AdminDishesListItemDetailsComponent} from './admin-dishes-list-item-details/admin-dishes-list-item-details.component';
import {AdminOrdersListItemDetailsComponent} from './admin-orders-list-item-details/admin-orders-list-item-details.component';
import {UserService} from './user.service';
import {OrderSummaryMessageComponent} from './order-summary-message/order-summary-message.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent,  },
  { path: 'order-summary', component: OrderSummaryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin/home', component: AdminHomeComponent, canActivate: [ UserService ] },
  { path: 'admin/dishes', component: AdminDishesListComponent, canActivate: [ UserService ] },
  { path: 'admin/orders', component: AdminOrdersListComponent, canActivate: [ UserService ] },
  { path: 'admin/dishes/details/:id', component: AdminDishesListItemDetailsComponent, canActivate: [ UserService ] },
  { path: 'admin/orders/details/:id', component: AdminOrdersListItemDetailsComponent, canActivate: [ UserService ] },
  { path: 'order-summary/info', component: OrderSummaryMessageComponent },

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
