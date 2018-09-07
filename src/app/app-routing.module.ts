import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderSummaryComponent} from './order-summary/order-summary.component';
import {LoginComponent} from './login/login.component';
import {MenuComponent} from './menu/menu.component';
import {HomeComponent} from './home/home.component';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {AdminDishesListComponent} from './admin-dishes-list/admin-dishes-list.component';
import {AdminOrdersListComponent} from './admin-orders-list/admin-orders-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent,  },
  { path: 'order-summary', component: OrderSummaryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'admin/dishes', component: AdminDishesListComponent },
  { path: 'admin/orders', component: AdminOrdersListComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
