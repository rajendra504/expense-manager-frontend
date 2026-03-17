import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExpense } from './view-expense';

describe('ViewExpense', () => {
  let component: ViewExpense;
  let fixture: ComponentFixture<ViewExpense>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewExpense]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewExpense);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
