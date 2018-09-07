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







}
