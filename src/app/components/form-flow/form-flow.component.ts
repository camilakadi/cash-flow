import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CashFlow } from 'src/app/models/cash-flow.model';
import { CashFlowStorageService } from 'src/app/services/cash-flow-storage.service';

interface ITypeFlow {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form-flow',
  styleUrls: ['./form-flow.component.scss'],
  templateUrl: './form-flow.component.html',
})
export class FormFlowComponent {
  transactionSubscription!: Subscription;
  index: number | null = null;

  transactionForm = this.formBuilder.group({
    description: ['', Validators.required],
    amount: ['', Validators.required],
    entryType: ['entry', Validators.required],
  });

  typesFlow: ITypeFlow[] = [
    { value: 'entry', viewValue: 'Entrada' },
    { value: 'exit', viewValue: 'Saída' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private cashFlowStorageService: CashFlowStorageService
  ) {}

  ngOnInit(): void {
    this.transactionSubscription =
      this.cashFlowStorageService.selectedTransaction$.subscribe(
        (transaction) => {
          if (!transaction) {
            this.transactionForm.reset();

            return;
          }

          const amount = this.formatCurrency(
            transaction.income ? transaction.income : transaction.expenses
          );

          this.transactionForm
            .get('description')
            ?.setValue(transaction.description);
          this.transactionForm.get('amount')?.setValue(amount);
          this.transactionForm
            .get('entryType')
            ?.setValue(transaction.income ? 'entry' : 'exit');

          this.index = transaction.index;
        }
      );
  }

  onSubmit() {
    if (!this.transactionForm.valid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    const amountValue = this.extractNumber(
      this.transactionForm.value.amount || ''
    );

    const income =
      this.transactionForm.value.entryType === 'entry' ? amountValue : 0;
    const expenses =
      this.transactionForm.value.entryType === 'exit' ? amountValue : 0;

    const cashFlowEntry = {
      description: this.transactionForm.value.description,
      income,
      expenses,
    } as CashFlow;

    if (this.index !== null) {
      this.cashFlowStorageService.completeTransactionToUpdate(
        cashFlowEntry,
        this.index
      );
      this.index = null;
      this.transactionForm.reset();

      return;
    }

    this.cashFlowStorageService.addTransaction(cashFlowEntry);
    this.transactionForm.reset();
  }

  private formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  private extractNumber(currencyString: string): number {
    const value = parseInt(currencyString.replace(/[^\d]/g, ''));

    if (isNaN(value)) {
      return 0;
    }

    const brlValue = value / 100;
    return brlValue;
  }
}
