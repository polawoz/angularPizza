import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDishesListComponent } from './admin-dishes-list.component';

describe('AdminDishesListComponent', () => {
  let component: AdminDishesListComponent;
  let fixture: ComponentFixture<AdminDishesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDishesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDishesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
