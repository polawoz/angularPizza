import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {Dish} from '../models/dish.model';
import {DishCount} from '../models/dishCount';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  cartItems: DishCount[];
  summaryOpened: Boolean;

  constructor(public readonly orderService: OrderService,
              ) { }

  ngOnInit() {
    this.loadDishes();

  }

  public loadDishes() {
    this.cartItems = this.orderService.getCartItems();

  }

  public removeFromCart(cartItem: Dish) {

    this.orderService.removeFromCart(cartItem);
  }





}
