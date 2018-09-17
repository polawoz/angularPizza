import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderDetailsFormComponent} from './order-details-form.component';
import {OrderService} from '../order.service';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Order} from '../models/order.model';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

describe('OrderDetailsFormComponent', () => {
  let component: OrderDetailsFormComponent;
  let fixture: ComponentFixture<OrderDetailsFormComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderDetailsFormComponent],
      providers: [
        OrderService,
        HttpClient,
        HttpHandler
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([])
      ]
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

  fit('should call the orderService and router', () => {

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

    component.order = savedOrder;

    const saveOrderSpy = spyOn(orderService, 'saveOrder');
    saveOrderSpy.and.returnValue(of({}));

    const router = TestBed.get(Router);
    const navigateSpy = spyOn(router, 'navigate');

    // when
    component.saveOrder();

    // then
    expect(getCartItemsSpy).toHaveBeenCalled();
    expect(saveOrderSpy).toHaveBeenCalledWith(savedOrder);
    expect(navigateSpy).toHaveBeenCalledWith(['order-summary/info']);


  });
});



