import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { CashFlowStorageService } from '../../services/cash-flow-storage.service';
import { TableFlowComponent } from './table-flow.component';

class MockCashFlowStorageService {
  cashFlow$: Subject<any> = new Subject<any>();
}

describe('TableFlowComponent', () => {
  let component: TableFlowComponent;
  let fixture: ComponentFixture<TableFlowComponent>;
  let cashFlowStorageService: CashFlowStorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableFlowComponent],
      providers: [
        {
          provide: CashFlowStorageService,
          useClass: MockCashFlowStorageService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableFlowComponent);
    component = fixture.componentInstance;
    cashFlowStorageService = TestBed.inject(CashFlowStorageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to cashFlow$ and update data', () => {
    const testData = [
      {
        description: 'test',
        expenses: 0,
        income: 10,
      },
    ];
    (component as any).cashFlowStorageService.cashFlow$.next(testData);

    expect(component.data).toEqual(testData);
  });
});
