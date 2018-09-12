import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {Order} from '../models/order.model';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {OrderItem} from '../models/orderItem';


@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {


  private readonly destroy$ = new Subject();
  order: Order = new class implements Order {
    orderItems: OrderItem[];
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
    const orderItems = [];

    cartItems.forEach(function(item) {

      const orderItem: OrderItem = new class implements OrderItem {
        amount: number = item.amount;
        dishId: number = item.id;
      };

      orderItems.push(orderItem);

    });

    this.order.orderItems = orderItems;

    this.orderService.saveOrder(this.order).pipe(takeUntil(this.destroy$))
      .subscribe(res => this.order = res);

    this.saved = true;

  }



}
