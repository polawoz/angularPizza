import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../models/user.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  name: string;
  password: string;
  verified: boolean;
  clicked: boolean;
  private readonly destroy$ = new Subject();
  users: User[];


  constructor(private readonly userService: UserService, ) { }

  ngOnInit() {
  this.verified = false;
  this.name = '';
  this.password = '';
  this.loadUsers();
    }


  private loadUsers() {

      this.userService.getUsers()
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => this.users = res);

  }


  public verifyLoginData(): void {
    this.clicked = true;
    const userVerified = this.users.find(x => x.name === this.name && x.password === this.password);

    if (userVerified) {

      this.verified = true;
      this.userService.login();
    }


  }






}
