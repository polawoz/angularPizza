import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersListItemComponent } from './admin-orders-list-item.component';

describe('AdminOrdersListItemComponent', () => {
  let component: AdminOrdersListItemComponent;
  let fixture: ComponentFixture<AdminOrdersListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrdersListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
