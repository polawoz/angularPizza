import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersDetailsDishComponent } from './admin-orders-details-dish.component';

describe('OrderListItemDetailsComponent', () => {
  let component: AdminOrdersDetailsDishComponent;
  let fixture: ComponentFixture<AdminOrdersDetailsDishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrdersDetailsDishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersDetailsDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
