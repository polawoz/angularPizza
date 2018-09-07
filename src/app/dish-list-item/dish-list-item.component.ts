import {Component, Input} from '@angular/core';
import {Dish} from '../models/dish.model';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-dish-list-item',
  templateUrl: './dish-list-item.component.html',
  styleUrls: ['./dish-list-item.component.css']
})
export class DishListItemComponent {

  @Input() dish: Dish;

  constructor(private readonly orderService: OrderService, ) { }


  public addToCart(dish: Dish) {
    this.orderService.addToCart(dish);
  }

}
