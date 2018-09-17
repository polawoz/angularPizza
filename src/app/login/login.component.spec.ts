import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {OrderService} from '../order.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {Order} from '../models/order.model';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        UserService,
        HttpClient,
        HttpHandler
      ],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });


  fit('should verify login data positive', () => {

    // given

    const userService = TestBed.get(UserService);
    const loginSpy = spyOn(userService, 'login');

    component.users = [{
      id: 1,
      name: 'admin',
      password: 'admin'
    }];

    component.name = 'admin';
    component.password = 'admin';

    // when
    component.verifyLoginData();

    // then
    expect(component.verified).toBeTruthy();
    expect(loginSpy).toHaveBeenCalled();


  });


  fit('should verify login data negative', () => {

    // given

    component.users = [{
      id: 1,
      name: 'admin',
      password: 'admin'
    }];

    component.name = 'admin';
    component.password = 'haslo';

    // when
    component.verifyLoginData();

    // then
    expect(component.verified).toBeFalsy();


  });


});
