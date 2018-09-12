import {OrderItem} from './orderItem';

export interface Order {
  id: number;
  orderItems: OrderItem[];
  status: string;
  firstName: string;
}
