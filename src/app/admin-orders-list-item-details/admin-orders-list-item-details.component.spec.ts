import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersListItemDetailsComponent } from './admin-orders-list-item-details.component';

describe('AdminOrdersListItemDetailsComponent', () => {
  let component: AdminOrdersListItemDetailsComponent;
  let fixture: ComponentFixture<AdminOrdersListItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrdersListItemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersListItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
