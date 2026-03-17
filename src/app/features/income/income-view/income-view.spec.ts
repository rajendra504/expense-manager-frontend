import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeView } from './income-view';

describe('IncomeView', () => {
  let component: IncomeView;
  let fixture: ComponentFixture<IncomeView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
