import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderDetailsFormComponent} from './order-details-form.component';
import {OrderService} from '../order.service';
import {Router} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Order} from '../models/order.model';
import {asyncData} from '../order.service.spec';

describe('OrderDetailsFormComponent', () => {
  let component: OrderDetailsFormComponent;
  let fixture: ComponentFixture<OrderDetailsFormComponent>;


  class MockOrderService {
    cartItems: [
      {
        id: 1,
        name: 'smaczna',
        isAvailable: true,
        description: 'pizza smaczna',
        type: 'pizza',
        price: 23,
        amount: 2
      },
      {
        id: 2,
        name: 'smaczna rowniez',
        isAvailable: true,
        description: 'pizza smaczna',
        type: 'pizza',
        price: 23,
        amount: 1
      }];
    summaryOpened: true;

    public getCartItems() {
    }

    public saveOrder(order: Order) {
    }

  }

  class MockRouter {
    public navigate() {

    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderDetailsFormComponent],
      providers: [
        {provide: OrderService, useClass: MockOrderService},
        {provide: Router, useClass: MockRouter},
        HttpClient,
        HttpHandler
      ],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should call the orderService', () => {

//    given

    const orderService = TestBed.get(OrderService);
    const getCartItemsSpy = spyOn(orderService, 'getCartItems');
    getCartItemsSpy.and.returnValue([
      {
        id: 1,
        name: 'smaczna',
        isAvailable: true,
        description: 'pizza smaczna',
        type: 'pizza',
        price: 23,
        amount: 2
      }]);

    const savedOrder: Order = {
      id: 1,
      orderItems: [{dishId: 1, amount: 2}],
      status: 'In progress',
      orderDetails: {
        firstName: '',
        lastName: '',
        street: '',
        phone: ''
      },
      sum: 40
    };

    const saveOrderSpy = spyOn(orderService, 'saveOrder');
    saveOrderSpy.and.returnValue(asyncData(savedOrder));

    const router = TestBed.get(Router);
    const navigateSpy = spyOn(router, 'navigate');


    // when
    component.saveOrder();


    // then
    expect(getCartItemsSpy).toHaveBeenCalled();
    expect(saveOrderSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalled();


  });
});

