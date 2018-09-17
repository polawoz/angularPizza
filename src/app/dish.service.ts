import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Dish} from './models/dish.model';



@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(readonly http: HttpClient, ) { }


  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>('/api/dishes');
  }


  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(`/api/dishes/${id}`);
  }


  updateDish(dish: Dish): Observable<Dish> {

    return this.http.put<Dish>(`/api/dishes/${dish.id}`, dish);
  }

  public deleteDish(id: number): Observable<void> {
    return this.http.delete<void>(`/api/dishes/${id}`);
  }








}
