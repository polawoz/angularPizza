import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Order} from '../models/order.model';


@Component({
  selector: 'app-admin-orders-list-item',
  templateUrl: './admin-orders-list-item.component.html',
  styleUrls: ['./admin-orders-list-item.component.css']
})
export class AdminOrdersListItemComponent implements OnInit {


  @Input() order: Order;

  constructor( ) { }

  ngOnInit() {


  }



}
