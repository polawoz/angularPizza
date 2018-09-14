import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../order.service';
import {Subject} from 'rxjs';
import {Order} from '../models/order.model';
import {OrderItem} from '../models/orderItem';
import {takeUntil} from 'rxjs/operators';
import {OrderDetails} from '../models/orderDetails';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-details-form',
  templateUrl: './order-details-form.component.html',
  styleUrls: ['./order-details-form.component.css']
})
export class OrderDetailsFormComponent implements OnInit, OnDestroy {


  private readonly destroy$ = new Subject();
  order: Order = new class implements Order {
    id: number;
    orderItems: OrderItem[];
    status: string;
    sum: number;
    orderDetails: OrderDetails;
  };

  public saved: boolean;


  orderDetailsData = new FormGroup({
    firstName: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl(''),
    street: new FormControl(''),
    phone: new FormControl('')
  });


  constructor(private readonly orderService: OrderService,
              private router: Router, ) {
  }

  ngOnInit() {
    this.saved = false;
  }

  public saveOrder(): void {

    const cartItems = this.orderService.getCartItems();
    const orderItems = [];

    cartItems.forEach(function (item) {

      const orderItem: OrderItem = new class implements OrderItem {
        amount: number = item.amount;
        dishId: number = item.id;
      };

      orderItems.push(orderItem);

    });

    this.order.orderItems = orderItems;


    this.order.orderDetails = this.orderDetailsData.value;

    this.order.status = 'Oczekujacy';

    this.orderService.saveOrder(this.order).pipe(takeUntil(this.destroy$))
      .subscribe(res => this.order = res);

    this.saved = true;

    this.orderService.cartItems = new Array();

    this.orderService.summaryOpened = false;

    this.router.navigate(['order-summary/info']);

  }

  public onSubmit() {
    this.saveOrder();
  }

  ngOnDestroy(): void {
    this.orderService.summaryOpened = false;

  }


}
