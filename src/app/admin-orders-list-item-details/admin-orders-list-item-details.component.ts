import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {OrderService} from '../order.service';
import {Order} from '../models/order.model';
import {DishService} from '../dish.service';
import {Dish} from '../models/dish.model';
import {OrderItem} from '../models/orderItem';


@Component({
  selector: 'app-admin-orders-list-item-details',
  templateUrl: './admin-orders-list-item-details.component.html',
  styleUrls: ['./admin-orders-list-item-details.component.css']
})
export class AdminOrdersListItemDetailsComponent implements OnInit {

  private readonly destroy$ = new Subject();
  order: Order;
  dishes: Dish[] = new Array();
  orderItems: OrderItem[];

  constructor(private readonly route: ActivatedRoute,
              private readonly orderService: OrderService,
              private readonly dishService: DishService,
              ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    this.orderService.getOrder(+id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.order = res;
        this.orderItems = res.orderItems;
        this.getDishes();
      });
  }

  private getDishes() {

    let id;

    for (let i = 0; i < this.orderItems.length; i++) {
      id = this.orderItems[i].dishId;

      this.dishService.getDish(+id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => this.dishes.push(res));


    }



 /*

    dishIds.forEach(function(id) {

      const dishId = id.toString().substring(0, (id.toString().indexOf('/')) - 1);

      this.dishService.getDish(+1)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => this.dishes.push(res));
    });*/

  }


  public changeStatusToInProgress(): void {
    this.order.status = 'In progress';
    this.update();
  }

  public changeStatusToInDelivery(): void {
    this.order.status = 'In delivery';
    this.update();
  }


  public changeStatusToDelivered(): void {
    this.order.status = 'Delivered';
    this.update();
  }

  public update(): void {
    this.orderService.updateOrder(this.order).pipe(takeUntil(this.destroy$))
      .subscribe(res => this.order = res);

  }




}
