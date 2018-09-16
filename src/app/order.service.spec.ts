import {TestBed, inject, async} from '@angular/core/testing';
import { OrderService } from './order.service';
import {HttpClient, HttpClientModule, HttpParams, HttpRequest} from '@angular/common/http';
import {Order} from './models/order.model';

import {defer} from 'rxjs';
import {DishCount} from './models/dishCount';
import {Dish} from './models/dish.model';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('OrderService', () => {


  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(() => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'post']);

    TestBed.configureTestingModule({
      providers: [OrderService, { provide: HttpClient, useValue: httpClientSpy }]
    });


  });

  fit('should be created', inject([OrderService], (service: OrderService) => {
    expect(service).toBeTruthy();
  }));



  fit('should return orders', inject([OrderService], (service: OrderService) => {


    const expectedOrders: Order[] =
      [{ id: 1,
        orderItems: [{  dishId: 1, amount: 1}],
        status: 'Delivered',
        orderDetails: {firstName: 'Jan', lastName: 'Nowak', street: 'Ulicaa', phone: '444'},
        sum: 100 },

        { id: 2,
          orderItems: [{  dishId: 1, amount: 1}],
          status: 'Delivered',
          orderDetails: {firstName: 'Andrzej', lastName: 'Nowak', street: 'Ulicaa', phone: '444'},
          sum: 100 }

      ];

    httpClientSpy.get.and.returnValue(asyncData(expectedOrders));

    service.getOrders().subscribe(
      orders => expect(orders).toEqual(expectedOrders, 'expected orders'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');


  }));



  fit('should add first dish to cart', inject([OrderService], (service: OrderService) => {



    const dishToAdd: Dish = {id: 1,
    name: 'smaczna',
    isAvailable: true,
    description: 'pizza smaczna',
    type: 'pizza',
    price: 23

    };

    service.addToCart(dishToAdd);

    expect(service.cartItems.length).toBe(1);


  }));


  fit('should add second same dish to cart', inject([OrderService], (service: OrderService) => {



    const dishToAdd: Dish = {id: 1,
      name: 'smaczna',
      isAvailable: true,
      description: 'pizza smaczna',
      type: 'pizza',
      price: 23

    };

    service.addToCart(dishToAdd);

    // when
    service.addToCart(dishToAdd);

    expect(service.cartItems.length).toBe(1);
    expect(service.cartItems[0].amount).toBe(2);


  }));


  fit('should add second dish to cart', inject([OrderService], (service: OrderService) => {



    const dishToAdd: DishCount = {id: 1,
      name: 'smaczna',
      isAvailable: true,
      description: 'pizza smaczna',
      type: 'pizza',
      price: 23,
      amount: 2

    };

    const secondDishToAdd: Dish = {id: 2,
      name: 'smaczna rowniez',
      isAvailable: true,
      description: 'pizza smaczna',
      type: 'pizza',
      price: 23

    };

    service.cartItems.push(dishToAdd);

    // when
    service.addToCart(secondDishToAdd);

    expect(service.cartItems.length).toBe(2);



  }));


  fit('should remove dish with amount count 1 from cart', inject([OrderService], (service: OrderService) => {



    const dishToAdd: DishCount = {id: 1,
      name: 'smaczna',
      isAvailable: true,
      description: 'pizza smaczna',
      type: 'pizza',
      price: 23,
      amount: 2

    };

    const secondDishToAdd: DishCount = {id: 2,
      name: 'smaczna rowniez',
      isAvailable: true,
      description: 'pizza smaczna',
      type: 'pizza',
      price: 23,
      amount: 1

    };

    const dishToRemove: Dish = {id: 2,
      name: 'smaczna rowniez',
      isAvailable: true,
      description: 'pizza smaczna',
      type: 'pizza',
      price: 23,
    };

    service.cartItems.push(dishToAdd);
    service.cartItems.push(secondDishToAdd);

    // when
    service.removeFromCart(dishToRemove);

    expect(service.cartItems.length).toBe(1);



  }));



  fit('should not remove dish with amount count 2 from cart', inject([OrderService], (service: OrderService) => {



    const dishToAdd: DishCount = {id: 1,
      name: 'smaczna',
      isAvailable: true,
      description: 'pizza smaczna',
      type: 'pizza',
      price: 23,
      amount: 2

    };

    const secondDishToAdd: DishCount = {id: 2,
      name: 'smaczna rowniez',
      isAvailable: true,
      description: 'pizza smaczna',
      type: 'pizza',
      price: 23,
      amount: 1

    };

    const dishToRemove: Dish = {id: 1,
      name: 'smaczna',
      isAvailable: true,
      description: 'pizza smaczna',
      type: 'pizza',
      price: 23,
    };

    service.cartItems.push(dishToAdd);
    service.cartItems.push(secondDishToAdd);

    // when
    service.removeFromCart(dishToRemove);

    expect(service.cartItems.length).toBe(2);


  }));



  fit('should save order', inject([OrderService], (service: OrderService) => {


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


    // when
    service.saveOrder(orderToSave);

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');




  }));




});




describe('FakeHttpClientResponses', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        OrderService
      ]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  fit(`should send GET orders request`, async(inject([OrderService, HttpTestingController],
    (service: OrderService, backend: HttpTestingController) => {
      service.getOrders().subscribe();

      backend.expectOne((req: HttpRequest<any>) => {

        expect(req.url).toBe('/api/orders');
        expect(req.method).toBe('GET');
        expect(req.body).toBeNull();

        return req.url === '/api/orders'
          && req.method === 'GET'
          && req.body === null;
      });



  })));


  fit(`should save order`, async(inject([OrderService, HttpTestingController],
    (service: OrderService, backend: HttpTestingController) => {

      // given
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

      // when
      service.saveOrder(orderToSave).subscribe();

      // then
      backend.expectOne((req: HttpRequest<any>) => {

        expect(req.url).toBe('/api/orders');
        expect(req.method).toBe('POST');
        expect(req.body).toBe(orderToSave);

        return req.url === '/api/orders'
          && req.method === 'POST'
          && req.body === orderToSave;
      });



    })));





});




export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
