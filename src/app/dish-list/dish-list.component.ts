import { Component, OnInit } from '@angular/core';
import {DishService} from '../dish.service';
import {Dish} from '../models/dish.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {


  dishes: Dish[];
  dishType: string;


  private readonly destroy$ = new Subject();

  constructor(private readonly dishService: DishService,
              ) { }

  ngOnInit(): void {
    this.loadDishes();
    this.dishType = 'pizza';

  }

  private loadDishes() {
    this.dishService.getDishes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => this.dishes = res);
  }

  public showPizza() {
    this.dishType = 'pizza';
  }

  public showPasta() {
    this.dishType = 'spagetti';
  }

  public showDrinks() {
    this.dishType = 'drink';
  }


}
