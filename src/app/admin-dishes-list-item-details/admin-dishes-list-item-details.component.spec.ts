import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDishesListItemDetailsComponent } from './admin-dishes-list-item-details.component';

describe('AdminDishesListItemDetailsComponent', () => {
  let component: AdminDishesListItemDetailsComponent;
  let fixture: ComponentFixture<AdminDishesListItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDishesListItemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDishesListItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
