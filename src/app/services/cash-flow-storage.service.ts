import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CashFlow } from '../models/cash-flow.model';
import { FinancialSummary } from '../models/financial-summary.model';

@Injectable({
  providedIn: 'root',
})
export class CashFlowStorageService {
  private cashFlowSubject = new BehaviorSubject<CashFlow[]>([]);
  private selectedTransactionSubject = new BehaviorSubject<any>(null);
  private selectedDateSubject = new BehaviorSubject<string>('');
  private financialSummarySubject = new BehaviorSubject<FinancialSummary>({
    totalIncome: 0,
    totalExpense: 0,
    difference: 0,
  });

  public cashFlow$ = this.cashFlowSubject.asObservable();
  public selectedTransaction$ = this.selectedTransactionSubject.asObservable();
  public selectedDate$ = this.selectedDateSubject.asObservable();
  public financialSummary$ = this.financialSummarySubject.asObservable();

  selectedDate = '';

  constructor() {
    this.selectedDate$.subscribe((date) => {
      if (!date) {
        return;
      }

      this.loadTransactions(date);
      this.selectedDate = date;
    });
  }

  changeSelectedDate(date: string): void {
    this.selectedDateSubject.next(date);
    this.loadTransactions(date);
  }

  updateTransaction(data: CashFlow[]): void {
    localStorage.setItem(
      `cashFlowData-${this.selectedDate}`,
      JSON.stringify(data)
    );
    const financialSummary = this.calculateTotal(data);

    this.cashFlowSubject.next(data);
    this.financialSummarySubject.next(financialSummary);
  }

  addTransaction(data: CashFlow): void {
    const currentData = this.cashFlowSubject.getValue();
    currentData.push(data);

    this.updateTransaction(currentData);
  }

  setTransactionToUpdate(transaction: CashFlow, index: number): void {
    this.selectedTransactionSubject.next({ ...transaction, index });
  }

  completeTransactionToUpdate(data: CashFlow, index: number): void {
    const currentData = this.cashFlowSubject.getValue();
    currentData[index] = data;

    this.selectedTransactionSubject.next(null);
    this.updateTransaction(currentData);
  }

  removeTransaction(index: number): void {
    const data = this.cashFlowSubject.getValue();
    data.splice(index, 1);

    if (this.selectedTransactionSubject.getValue()?.index === index) {
      this.selectedTransactionSubject.next(null);
    }

    this.updateTransaction(data);
  }

  private loadTransactions(date: string): void {
    const data = JSON.parse(
      localStorage.getItem(`cashFlowData-${date}`) || '[]'
    );
    const financialSummary = this.calculateTotal(data);

    this.cashFlowSubject.next(data);
    this.financialSummarySubject.next(financialSummary);
  }

  private calculateTotal(data: CashFlow[]): FinancialSummary {
    return data.reduce(
      (acc, cashFlow) => {
        acc.totalIncome += cashFlow.income;
        acc.totalExpense += cashFlow.expenses;
        acc.difference = acc.totalIncome - acc.totalExpense;
        return acc;
      },
      { totalIncome: 0, totalExpense: 0, difference: 0 }
    );
  }
}
