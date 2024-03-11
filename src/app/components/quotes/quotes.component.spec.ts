import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuotesComponent } from './quotes.component';

describe('QuotesComponent', () => {
  let component: QuotesComponent;
  let fixture: ComponentFixture<QuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuotesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch quotes data and format it', async () => {
    const mockData = {
      USDBRL: {
        code: 'USD',
        codein: 'BRL',
        name: 'Dólar Americano/Real Brasileiro',
        high: '4.9923',
        low: '4.9344',
        varBid: '0.0029',
        pctChange: '0.06',
        bid: '4.9825',
        ask: '4.9845',
        timestamp: '1710104399',
        create_date: '2024-03-10 17:59:59',
      },
      EURBRL: {
        code: 'EUR',
        codein: 'BRL',
        name: 'Euro/Real Brasileiro',
        high: '5.3966',
        low: '5.3966',
        varBid: '0',
        pctChange: '0',
        bid: '5.3716',
        ask: '5.4216',
        timestamp: '1710105995',
        create_date: '2024-03-10 18:26:35',
      },
      BTCBRL: {
        code: 'BTC',
        codein: 'BRL',
        name: 'Bitcoin/Real Brasileiro',
        high: '351000',
        low: '343233',
        varBid: '4518',
        pctChange: '1.31',
        bid: '348194',
        ask: '348408',
        timestamp: '1710106039',
        create_date: '2024-03-10 18:27:19',
      },
      ARSBRL: {
        code: 'ARS',
        codein: 'BRL',
        name: 'Peso Argentino/Real Brasileiro',
        high: '0.0058',
        low: '0.0058',
        varBid: '0',
        pctChange: '0',
        bid: '0.0058',
        ask: '0.0058',
        timestamp: '1710106005',
        create_date: '2024-03-10 18:26:45',
      },
    };

    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve(new Response(JSON.stringify(mockData)))
    );

    await component.ngOnInit();

    setTimeout(() => {
      expect(component.quotesList).toEqual([
        {
          name: 'Dólar',
          value: 4.9825,
          percentage: '+0,06%',
          badgeColor: 'green',
        },
        {
          name: 'Euro',
          value: 5.3716,
          percentage: '+0,00%',
          badgeColor: 'green',
        },
        {
          name: 'Bitcoin',
          value: 348194,
          percentage: '+1,31%',
          badgeColor: 'green',
        },
        {
          name: 'Peso',
          value: 0.0058,
          percentage: '+0,00%',
          badgeColor: 'green',
        },
      ]);
    }, 1000);
  });
});
