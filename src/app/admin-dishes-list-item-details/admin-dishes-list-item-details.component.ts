import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DishService} from '../dish.service';
import {Dish} from '../models/dish.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Order} from '../models/order.model';

@Component({
  selector: 'app-admin-dishes-list-item-details',
  templateUrl: './admin-dishes-list-item-details.component.html',
  styleUrls: ['./admin-dishes-list-item-details.component.css']
})
export class AdminDishesListItemDetailsComponent implements OnInit {


  private readonly destroy$ = new Subject();
  dish: Dish;

  constructor(private readonly route: ActivatedRoute,
              private readonly dishService: DishService,
              private router: Router) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    this.dishService.getDish(+id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => this.dish = res);

  }

  public changeAvailability() {

    this.dish.isAvailable = !this.dish.isAvailable;
    this.update();
  }

  public update(): void {
      this.dishService.updateDish(this.dish).pipe(takeUntil(this.destroy$))
        .subscribe(res => this.dish = res);

  }


  public deleteDish(dish: Dish) {
    this.dishService.deleteDish(dish.id).pipe(takeUntil(this.destroy$))
      .subscribe();

    this.router.navigate(['admin/dishes']);

  }

}
