import {Component, Input} from '@angular/core';
import {Dish} from '../models/dish.model';
import {OrderService} from '../order.service';
import {DishCount} from '../models/dishCount';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {


  @Input() cartItem: DishCount;



  constructor(private readonly orderService: OrderService, ) { }

  public removeFromCart(cartItem: Dish) {

    this.orderService.removeFromCart(cartItem);
  }

}
