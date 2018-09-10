import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {Order} from '../models/order.model';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {


  private readonly destroy$ = new Subject();
  order: Order = new class implements Order {
    dishIds: number[];
    firstName: string;
    id: number;
    status: string;
  };

  public saved: boolean;


  constructor(
              private readonly orderService: OrderService, ) { }



  ngOnInit() {
    this.saved = false;
  }


  public saveOrder(): void {

    const cartItems = this.orderService.getCartItems();
    const dishIds = [];

    cartItems.forEach(function(item) {
      dishIds.push(item.id + '/' + item.amount);

    });

    this.order.dishIds = dishIds;

    this.orderService.saveOrder(this.order).pipe(takeUntil(this.destroy$))
      .subscribe(res => this.order = res);

    this.saved = true;

  }



}
