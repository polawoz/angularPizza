import { Injectable } from '@angular/core';
import {Dish} from './models/dish.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Order} from './models/order.model';
import {DishCount} from './models/dishCount';


@Injectable({
  providedIn: 'root'
})
export class OrderService {


  cartItems: DishCount[] = new Array();



  constructor(readonly http: HttpClient, ) { }


  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/orders');
  }

  public getCartItems(): Dish[] {
    return this.cartItems;
  }




  public addToCart(dish) {

    const index = this.cartItems.findIndex(x => x.id === dish.id);

    if (index !== -1) {

      this.cartItems[index].amount += 1;
    } else {

      const dishCount = <DishCount>dish;
      dishCount.amount = 1;

      this.cartItems.push(dishCount);
    }

  }

  public removeFromCart(dish) {
    const index = this.cartItems.findIndex(x => x.id === dish.id);

    if (index !== -1) {
      this.cartItems[index].amount -= 1;
    }

    if (this.cartItems[index].amount === 0) {
      this.cartItems.splice(index, 1);
    }

  }

  public saveOrder() {


  }

  public sumDishesPrices(): number {

    let sum = 0;

    this.cartItems.forEach(function(e) {
        sum = sum + (e.price) * e.amount;
    });


    return sum;

  }


}
