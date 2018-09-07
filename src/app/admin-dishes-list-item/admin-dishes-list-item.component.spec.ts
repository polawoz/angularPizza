import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDishesListItemComponent } from './admin-dishes-list-item.component';

describe('AdminDishesListItemComponent', () => {
  let component: AdminDishesListItemComponent;
  let fixture: ComponentFixture<AdminDishesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDishesListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDishesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
