import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {OrderService} from '../order.service';
import {Order} from '../models/order.model';

@Component({
  selector: 'app-admin-orders-list-item-details',
  templateUrl: './admin-orders-list-item-details.component.html',
  styleUrls: ['./admin-orders-list-item-details.component.css']
})
export class AdminOrdersListItemDetailsComponent implements OnInit {

  private readonly destroy$ = new Subject();
  order: Order;

  constructor(private readonly route: ActivatedRoute,
              private readonly orderService: OrderService, ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    this.orderService.getOrder(+id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => this.order = res);

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
