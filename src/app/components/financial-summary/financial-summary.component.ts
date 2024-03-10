import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FinancialSummary } from 'src/app/models/financial-summary.model';
import { CashFlowStorageService } from 'src/app/services/cash-flow-storage.service';

@Component({
  selector: 'app-financial-summary',
  templateUrl: './financial-summary.component.html',
  styleUrls: ['./financial-summary.component.scss'],
})
export class FinancialSummaryComponent {
  summarySubscription!: Subscription;
  summary: FinancialSummary = {
    totalIncome: 0,
    totalExpense: 0,
    difference: 0,
  };

  constructor(private cashFlowStorageService: CashFlowStorageService) {}

  ngOnInit(): void {
    this.summarySubscription =
      this.cashFlowStorageService.financialSummary$.subscribe((summary) => {
        this.summary = summary;
      });
  }
}
