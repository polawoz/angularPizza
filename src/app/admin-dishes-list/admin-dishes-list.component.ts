import {Component, OnInit} from '@angular/core';
import {DishService} from '../dish.service';
import {Dish} from '../models/dish.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-admin-dishes-list',
  templateUrl: './admin-dishes-list.component.html',
  styleUrls: ['./admin-dishes-list.component.css']
})
export class AdminDishesListComponent implements OnInit {


  dishes: Dish[];

  private readonly destroy$ = new Subject();


  constructor(private readonly dishService: DishService, ) {
  }

  ngOnInit() {

    this.loadDishes();

  }

  private loadDishes() {
    this.dishService.getDishes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => this.dishes = res);
  }


}
