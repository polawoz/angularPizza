import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {Dish} from '../models/dish.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  cartItems: Dish[];

  constructor(public readonly orderService: OrderService,
              ) { }

  ngOnInit() {
    this.loadDishes();
  }

  public loadDishes() {
    this.cartItems = this.orderService.getCartItems();

  }



}
