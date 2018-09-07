import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  loggedIn: boolean;

  constructor(readonly http: HttpClient, ) { }


  public getUserByLogin(name: string): Observable<User> {
    return this.http.get<User>(`/api/users/${name}`);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');

  }

  public logout() {
    this.loggedIn = false;
  }

  public login() {
    this.loggedIn = true;
  }




}
