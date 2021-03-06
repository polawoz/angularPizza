import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {OrderService} from '../order.service';
import {Order} from '../models/order.model';
import {DishService} from '../dish.service';
import {OrderItem} from '../models/orderItem';
import {DishCount} from '../models/dishCount';


@Component({
  selector: 'app-admin-orders-list-item-details',
  templateUrl: './admin-orders-list-item-details.component.html',
  styleUrls: ['./admin-orders-list-item-details.component.css']
})
export class AdminOrdersListItemDetailsComponent implements OnInit {

  private readonly destroy$ = new Subject();
  order: Order;
  dishes: DishCount[] = new Array();
  orderItems: OrderItem[];

  constructor(private readonly route: ActivatedRoute,
              private readonly orderService: OrderService,
              private readonly dishService: DishService,
              private router: Router,
  ) {
  }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    this.orderService.getOrder(+id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.order = res;
        this.orderItems = res.orderItems;
        this.getDishes();
      });
  }


  private getDishes() {

    let id;
    let dishCount;

    for (let i = 0; i < this.orderItems.length; i++) {
      id = this.orderItems[i].dishId;

      this.dishService.getDish(+id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {

          dishCount = <DishCount>res;
          dishCount.amount = this.orderItems[i].amount;
          this.dishes.push(dishCount);
        });


    }


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

  public deleteOrder(order: Order) {
    this.orderService.deleteOrder(order.id).pipe(takeUntil(this.destroy$))
      .subscribe();

    this.router.navigate(['admin/orders']);

  }


}
