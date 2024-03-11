import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CashFlowStorageService } from '../../services/cash-flow-storage.service';
import { FinancialSummaryComponent } from './financial-summary.component';

@Pipe({ name: 'brlCurrency' })
class CurrencyPipeMock implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

class MockCashFlowStorageService {
  financialSummary$ = of({
    totalIncome: 1000,
    totalExpense: 500,
    difference: 500,
  });
}

describe('FinancialSummaryComponent', () => {
  let component: FinancialSummaryComponent;
  let fixture: ComponentFixture<FinancialSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialSummaryComponent, CurrencyPipeMock],
      providers: [
        {
          provide: CashFlowStorageService,
          useClass: MockCashFlowStorageService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialSummaryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to financialSummary$ and update summary', () => {
    const mockSummary = {
      totalIncome: 1000,
      totalExpense: 500,
      difference: 500,
    };

    component.ngOnInit();

    expect(component.summary).toEqual(mockSummary);
  });
});
