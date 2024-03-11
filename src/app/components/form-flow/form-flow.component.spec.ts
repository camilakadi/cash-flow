import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { CashFlowStorageService } from 'src/app/services/cash-flow-storage.service';
import { FormFlowComponent } from './form-flow.component';

class MockCashFlowStorageService {
  selectedTransaction$: Subject<any> = new Subject<any>();
}

function normalizeString(str: string) {
  return str.normalize('NFKC');
}

describe('FormFlowComponent', () => {
  let component: FormFlowComponent;
  let fixture: ComponentFixture<FormFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFlowComponent],
      providers: [
        FormBuilder,
        {
          provide: CashFlowStorageService,
          useClass: MockCashFlowStorageService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the initial value of index', () => {
    expect(component.index).toBeNull();
  });

  it('should set the initial value of typesFlow', () => {
    expect(component.typesFlow).toEqual([
      { value: 'entry', viewValue: 'Entrada' },
      { value: 'exit', viewValue: 'Saída' },
    ]);
  });

  it('should reset the form when there is no transaction', () => {
    component.transactionForm.setValue({
      description: 'Test',
      amount: '100',
      entryType: 'entry',
    });

    (component as any).cashFlowStorageService.selectedTransaction$.next(null);

    expect(component.transactionForm.value).toEqual({
      description: null,
      amount: null,
      entryType: null,
    });
  });

  it('should set the form values when there is a transaction', () => {
    const mockTransaction = {
      description: 'Test',
      income: 100,
      expenses: null,
      index: 1,
    };

    (component as any).cashFlowStorageService.selectedTransaction$.next(
      mockTransaction
    );

    expect(component.transactionForm.value).toEqual({
      description: 'Test',
      amount: jasmine.any(String),
      entryType: 'entry',
    });

    expect(normalizeString(component.transactionForm.value.amount!)).toBe(
      'R$ 100,00'
    );
  });
});
