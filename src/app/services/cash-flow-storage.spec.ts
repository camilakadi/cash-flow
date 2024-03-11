import { TestBed } from '@angular/core/testing';
import { CashFlowStorageService } from './cash-flow-storage.service';

describe('CashFlowStorageService', () => {
  let service: CashFlowStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashFlowStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update transaction', () => {
    const cashFlow = [
      {
        description: 'Test',
        income: 100,
        expenses: 50,
      },
    ];
    service.updateTransaction(cashFlow);
    service.cashFlow$.subscribe((data) => {
      expect(data).toEqual(cashFlow);
    });
  });

  it('should add transaction', () => {
    const initialCashFlow = [
      {
        description: 'Test',
        income: 100,
        expenses: 50,
      },
    ];
    const newTransaction = {
      description: 'Test',
      income: 200,
      expenses: 75,
    };
    const expectedCashFlow = [...initialCashFlow, newTransaction];

    service.updateTransaction(initialCashFlow);
    service.addTransaction(newTransaction);

    service.cashFlow$.subscribe((data) => {
      expect(data).toEqual(expectedCashFlow);
    });
  });

  it('should set transaction to update', () => {
    const cashFlow = [
      {
        description: 'Test',
        income: 100,
        expenses: 50,
      },
    ];
    const transaction = {
      description: 'Test',
      income: 200,
      expenses: 75,
    };
    const expectedCashFlow = { ...transaction, index: 0 } as any;

    service.updateTransaction(cashFlow);
    service.setTransactionToUpdate(transaction, 0);

    service.selectedTransaction$.subscribe((data) => {
      expect(data).toEqual(expectedCashFlow);
    });
  });

  it('should complete transaction to update', () => {
    const cashFlow = [
      {
        description: 'Test',
        income: 100,
        expenses: 50,
      },
    ];
    const transaction = {
      description: 'Test',
      income: 200,
      expenses: 75,
      index: 0,
    };
    const expectedCashFlow = [transaction];

    service.updateTransaction(cashFlow);
    service.completeTransactionToUpdate(transaction, 0);

    service.cashFlow$.subscribe((data) => {
      expect(data).toEqual(expectedCashFlow);
    });
  });

  it('should remove transaction', () => {
    const cashFlow = [
      {
        description: 'Test',
        income: 100,
        expenses: 50,
      },
    ];
    const expectedCashFlow = [] as any[];

    service.updateTransaction(cashFlow);
    service.removeTransaction(0);

    service.cashFlow$.subscribe((data) => {
      expect(data).toEqual(expectedCashFlow);
    });
  });

  it('should calculate financial summary', () => {
    const cashFlow = [
      {
        description: 'Test',
        income: 100,
        expenses: 50,
      },
      {
        description: 'Test',
        income: 200,
        expenses: 75,
      },
    ];
    const expectedFinancialSummary = {
      totalIncome: 300,
      totalExpense: 125,
      difference: 175,
    };

    service.addTransaction(cashFlow[0]);
    service.addTransaction(cashFlow[1]);

    service.financialSummary$.subscribe((data) => {
      expect(data).toEqual(expectedFinancialSummary);
    });
  });
});
