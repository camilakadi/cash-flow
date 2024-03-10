import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { CashFlowStorageService } from 'src/app/services/cash-flow-storage.service';

@Component({
  selector: 'app-current-month',
  templateUrl: './current-month.component.html',
  styleUrls: ['./current-month.component.scss'],
  providers: [DatePipe],
})
export class CurrentMonthComponent {
  constructor(
    private datePipe: DatePipe,
    private cashFlowStorageService: CashFlowStorageService
  ) {}

  date = new FormControl(new Date());

  ngOnInit() {
    this.changeSelectedDate();
  }

  chosenMonthHandler(
    normalizedMonth: any,
    datepicker: MatDatepicker<FormControl<Date | null>>
  ) {
    this.date.setValue(normalizedMonth);
    datepicker.close();
  }

  formatDate(date: Date | null): string {
    const formattedDate = this.datePipe.transform(date, 'MMMM/yyyy') || '';
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  advanceMonth() {
    const newDate = new Date(this.date.value as Date);
    newDate.setMonth(newDate.getMonth() + 1);
    this.date.setValue(newDate);
  }

  goBackMonth() {
    const newDate = new Date(this.date.value as Date);
    newDate.setMonth(newDate.getMonth() - 1);
    this.date.setValue(newDate);
  }

  changeSelectedDate() {
    const date = this.datePipe.transform(this.date.value, 'MMyyyy') || '';
    this.cashFlowStorageService.changeSelectedDate(date);
  }
}
