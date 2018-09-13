import {Component, Input, OnInit} from '@angular/core';
import {Dish} from '../models/dish.model';
import {DishCount} from '../models/dishCount';

@Component({
  selector: 'app-orders-details-dish',
  templateUrl: './admin-orders-details-dish.component.html',
  styleUrls: ['./admin-orders-details-dish.component.css']
})
export class AdminOrdersDetailsDishComponent implements OnInit {

  @Input() dish: DishCount;

  constructor() { }

  ngOnInit() {
  }

}
