import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSummaryMessageComponent } from './order-summary-message.component';

describe('OrderSummaryMessageComponent', () => {
  let component: OrderSummaryMessageComponent;
  let fixture: ComponentFixture<OrderSummaryMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSummaryMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSummaryMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
