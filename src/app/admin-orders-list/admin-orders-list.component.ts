import {Component, OnInit} from '@angular/core';
import {Order} from '../models/order.model';
import {Subject} from 'rxjs';
import {OrderService} from '../order.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-admin-orders-list',
  templateUrl: './admin-orders-list.component.html',
  styleUrls: ['./admin-orders-list.component.css']
})
export class AdminOrdersListComponent implements OnInit {

  orders: Order[];
  private readonly destroy$ = new Subject();

  constructor(private readonly orderService: OrderService,) {
  }

  ngOnInit() {

    this.loadOrders();

  }

  private loadOrders() {
    this.orderService.getOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => this.orders = res);
  }


}
