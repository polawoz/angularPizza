import {OrderItem} from './orderItem';
import {OrderDetails} from './orderDetails';

export interface Order {
  id: number;
  orderItems: OrderItem[];
  status: string;
  orderDetails: OrderDetails;
}
