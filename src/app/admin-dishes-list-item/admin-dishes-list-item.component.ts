import {Component, Input, OnInit} from '@angular/core';
import {Dish} from '../models/dish.model';

@Component({
  selector: 'app-admin-dishes-list-item',
  templateUrl: './admin-dishes-list-item.component.html',
  styleUrls: ['./admin-dishes-list-item.component.css']
})
export class AdminDishesListItemComponent implements OnInit {


  @Input() dish: Dish;

  constructor() { }

  ngOnInit() {
  }

}
