import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { CashFlowStorageService } from '../../services/cash-flow-storage.service';
import { CurrentMonthComponent } from './current-month.component';

describe('CurrentMonthComponent', () => {
  let component: CurrentMonthComponent;
  let fixture: ComponentFixture<CurrentMonthComponent>;
  let datePipe: DatePipe;
  let cashFlowStorageService: CashFlowStorageService;

  beforeEach(async () => {
    jasmine.clock().mockDate(new Date('2024-03-10T12:00:00Z'));

    await TestBed.configureTestingModule({
      declarations: [CurrentMonthComponent],
      providers: [DatePipe, CashFlowStorageService],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentMonthComponent);
    component = fixture.componentInstance;
    datePipe = TestBed.inject(DatePipe);
    cashFlowStorageService = TestBed.inject(CashFlowStorageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the initial date', () => {
    expect(component.date.value).toEqual(new Date());
  });

  it('should format the date correctly', () => {
    const date = new Date(
      '2022-01-01 00:00:00 GMT-0300 (Brasilia Standard Time)'
    );
    const formattedDate = component.formatDate(date);
    expect(formattedDate).toBe('January/2022');
  });

  it('should advance the month', () => {
    const currentDate = component.date.value;
    component.advanceMonth();
    const newDate = new Date(currentDate as Date);
    newDate.setMonth(newDate.getMonth() + 1);
    expect(component.date.value).toEqual(newDate);
  });

  it('should go back a month', () => {
    const currentDate = component.date.value;
    component.goBackMonth();
    const newDate = new Date(currentDate as Date);
    newDate.setMonth(newDate.getMonth() - 1);
    expect(component.date.value).toEqual(newDate);
  });

  it('should change the selected date', () => {
    const date = new Date('2022-01-01');
    const formattedDate = datePipe.transform(date, 'MMyyyy') || '';
    spyOn(datePipe, 'transform').and.returnValue('012022');
    spyOn(cashFlowStorageService, 'changeSelectedDate');
    component.date.setValue(date);
    component.changeSelectedDate();

    expect(cashFlowStorageService.changeSelectedDate).toHaveBeenCalledWith(
      formattedDate
    );
  });

  it('should handle chosen month', () => {
    const normalizedMonth = new Date('2022-01-01');
    const datepicker = jasmine.createSpyObj<
      MatDatepicker<FormControl<Date | null>>
    >('MatDatepicker', ['close']);
    component.chosenMonthHandler(normalizedMonth, datepicker);
    expect(component.date.value).toEqual(normalizedMonth);
    expect(datepicker.close).toHaveBeenCalled();
  });
});
