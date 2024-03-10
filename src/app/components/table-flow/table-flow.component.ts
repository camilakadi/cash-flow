import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CashFlow } from 'src/app/models/cash-flow.model';
import { CashFlowStorageService } from 'src/app/services/cash-flow-storage.service';

@Component({
  selector: 'app-table-flow',
  templateUrl: './table-flow.component.html',
  styleUrls: ['./table-flow.component.scss'],
})
export class TableFlowComponent {
  data: CashFlow[] = [];
  displayedColumns: string[] = ['description', 'income', 'expenses', 'action'];
  dataSubscription!: Subscription;

  @ViewChild(MatTable) table!: MatTable<CashFlow>;

  constructor(private cashFlowStorageService: CashFlowStorageService) {}

  ngOnInit(): void {
    this.dataSubscription = this.cashFlowStorageService.cashFlow$.subscribe(
      (data) => {
        this.data = data;

        if (this.table) this.table.renderRows();
      }
    );
  }

  editTransaction = (transaction: CashFlow, index: number) => {
    this.cashFlowStorageService.setTransactionToUpdate(transaction, index);
  };

  deleteTransaction = (index: number) => {
    this.cashFlowStorageService.removeTransaction(index);
  };
}
