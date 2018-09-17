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
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required)
  });

  firstNameValid: boolean;
  lastNameValid: boolean;
  streetValid: boolean;
  phoneValid: boolean;



  constructor(private readonly orderService: OrderService,
              private router: Router, ) {
  }

  ngOnInit() {
    this.saved = false;

    this.firstNameValid = true;
    this.lastNameValid = true;
    this.streetValid = true;
    this.phoneValid = true;

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

    this.firstNameValid = !this.orderDetailsData.get('firstName').hasError('required');
    this.lastNameValid = !this.orderDetailsData.get('lastName').hasError('required');
    this.streetValid = !this.orderDetailsData.get('street').hasError('required');
    this.phoneValid = !this.orderDetailsData.get('phone').hasError('required');

    if (this.orderDetailsData.valid) {
      this.saveOrder();
    }
  }

  ngOnDestroy(): void {
    this.orderService.summaryOpened = false;

  }


/*  forbiddenNameValidator(forbiddenName: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return control.value === forbiddenName ?
        {'forbiddenName': 'That name is forbidden' } : null;
    };
  }*/



}
