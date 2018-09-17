import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersListItemDetailsComponent } from './admin-orders-list-item-details.component';
import {OrderService} from '../order.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {DishService} from '../dish.service';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {Order} from '../models/order.model';

describe('AdminOrdersListItemDetailsComponent', () => {
  let component: AdminOrdersListItemDetailsComponent;
  let fixture: ComponentFixture<AdminOrdersListItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrdersListItemDetailsComponent],
      providers: [
        OrderService,
        DishService,
        HttpClient,
        HttpHandler,
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: {get() {} }} }}
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersListItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should get dishes from order', () => {

  // given
    const orderService = TestBed.get(OrderService);

    const orderToSave: Order = {
      id: 2,
      orderItems: [{dishId: 1, amount: 1}],
      status: 'In progress',
      orderDetails: {  firstName: '',
        lastName: '',
        street: '',
        phone: ''},
      sum: 20
    };

    const getOrderSpy = spyOn(orderService, 'getOrder');
    getOrderSpy.and.returnValue(
      of({}));

    const dishService = TestBed.get(DishService);

    const getDishSpy = spyOn(dishService, 'getDish');

    getDishSpy.and.returnValue(of({}));

    const orderItem = {dishId: 1, amount: 1};
    component.orderItems = [orderItem];

    // when
    component.ngOnInit();

    // then
    expect(getOrderSpy).toHaveBeenCalled();
    expect(getDishSpy).toHaveBeenCalledWith(orderItem.dishId);



  });



});



