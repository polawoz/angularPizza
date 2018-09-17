import {TestBed, inject, async} from '@angular/core/testing';
import { OrderService } from './order.service';
import {HttpClient, HttpClientModule, HttpParams, HttpRequest} from '@angular/common/http';
import {Order} from './models/order.model';

import {defer} from 'rxjs';
import {DishCount} from './models/dishCount';
import {Dish} from './models/dish.model';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('OrderService', () => {



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

  fit('should be created', inject([OrderService], (service: OrderService) => {
    expect(service).toBeTruthy();
  }));


  fit('should add first dish to cart', inject([OrderService], (service: OrderService) => {


    // given

    const dishToAdd: Dish = {id: 1,
      name: 'smaczna',
      isAvailable: true,
      description: 'pizza smaczna',
      type: 'pizza',
      price: 23

    };

    // when
    service.addToCart(dishToAdd);


    // then
    expect(service.cartItems.length).toBe(1);


  }));


  fit('should add second same dish to cart', inject([OrderService], (service: OrderService) => {

    // given

    const dishInCart: DishCount = {id: 1,
      name: 'smaczna',
      isAvailable: true,
      description: 'pizza smaczna',
      type: 'pizza',
      price: 23,
      amount: 1

    };

    service.cartItems.push(dishInCart);

    const dishToAdd: Dish = {id: 1,
      name: 'smaczna',
      isAvailable: true,
      description: 'pizza smaczna',
      type: 'pizza',
      price: 23

    };

    // when
    service.addToCart(dishToAdd);


    // then
    expect(service.cartItems.length).toBe(1);
    expect(service.cartItems[0].amount).toBe(2);


  }));


  fit('should add second dish to cart', inject([OrderService], (service: OrderService) => {


    // given
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

    // then
    expect(service.cartItems.length).toBe(2);



  }));


  fit('should remove dish with amount count 1 from cart', inject([OrderService], (service: OrderService) => {

    // given
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

    // then
    expect(service.cartItems.length).toBe(1);



  }));



  fit('should not remove dish with amount count 2 from cart', inject([OrderService], (service: OrderService) => {


    // given
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


    // then
    expect(service.cartItems.length).toBe(2);


  }));



  fit('should add second same dish to cart', inject([OrderService], (service: OrderService) => {

    // given

    const dishInCart: DishCount = {id: 1,
      name: 'smaczna',
      isAvailable: true,
      description: 'pizza smaczna',
      type: 'pizza',
      price: 23,
      amount: 1

    };

    service.cartItems.push(dishInCart);

    const dishToAdd: Dish = {id: 1,
      name: 'smaczna',
      isAvailable: true,
      description: 'pizza smaczna',
      type: 'pizza',
      price: 23

    };

    // when
    service.addToCart(dishToAdd);


    // then
    expect(service.cartItems.length).toBe(1);
    expect(service.cartItems[0].amount).toBe(2);


  }));



  fit('should sum dishes prices', inject([OrderService], (service: OrderService) => {


    // given
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
      price: 24,
      amount: 1

    };

    service.cartItems.push(dishToAdd);
    service.cartItems.push(secondDishToAdd);

    // when
    const result = service.sumDishesPrices();

    // then
    expect(result).toBe(70);



  }));



});




describe('FakeHttpClientResponsesToOrderService', () => {

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

  fit('should be created', inject([OrderService], (service: OrderService) => {
    expect(service).toBeTruthy();
  }));


  fit(`should return orders`, async(inject([OrderService, HttpTestingController],
    (service: OrderService, backend: HttpTestingController) => {


      // given
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

      // when
      service.getOrders().subscribe(res => {
        expect(res).toBe(expectedOrders);
      });

      // then
      const req = backend.expectOne('/api/orders');
      expect(req.request.url).toBe('/api/orders');
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toBeNull();
      req.flush(expectedOrders);

      backend.verify();

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
      const req = backend.expectOne('/api/orders');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(orderToSave);

    })));



  fit(`should return order`, async(inject([OrderService, HttpTestingController],
    (service: OrderService, backend: HttpTestingController) => {

      // given
      const order: Order = { id: 1,
          orderItems: [{  dishId: 1, amount: 1}],
          status: 'Delivered',
          orderDetails: {firstName: 'Jan', lastName: 'Nowak', street: 'Ulicaa', phone: '444'},
          sum: 100 };


      // when
      service.getOrder(order.id).subscribe();

      // then
      const req = backend.expectOne(`/api/orders/${order.id}`);
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toBeNull();
      req.flush(order);

      backend.verify();



    })));


  fit(`should update order`, async(inject([OrderService, HttpTestingController],
    (service: OrderService, backend: HttpTestingController) => {

      // given
      const orderToUpdate: Order = { id: 1,
        orderItems: [{  dishId: 1, amount: 1}],
        status: 'Delivered',
        orderDetails: {firstName: 'Jan', lastName: 'Nowak', street: 'Ulicaa', phone: '444'},
        sum: 100 };


      // when
      service.updateOrder(orderToUpdate).subscribe();

      // then
      const req = backend.expectOne(`/api/orders/${orderToUpdate.id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toBe(orderToUpdate);

      backend.verify();



    })));


});


