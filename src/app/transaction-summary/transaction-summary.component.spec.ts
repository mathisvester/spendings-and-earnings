import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSummaryComponent } from './transaction-summary.component';

describe('TransactionSummaryComponent', () => {
  let component: TransactionSummaryComponent;
  let fixture: ComponentFixture<TransactionSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
