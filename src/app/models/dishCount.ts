import {Dish} from './dish.model';

export interface DishCount extends Dish {
  amount: number;
}
