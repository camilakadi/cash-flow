import { Component } from '@angular/core';

export interface IQuotes {
  id: number;
  name: string;
  percentage: number;
  value: number;
}

const quotesList: IQuotes[] = [
  {
    id: 1,
    name: 'dolar',
    percentage: 0.98,
    value: 4.0026,
  },
  {
    id: 2,
    name: 'dolar',
    percentage: 0.98,
    value: 4.0026,
  },
  {
    id: 3,
    name: 'dolar',
    percentage: 0.98,
    value: 4.0026,
  },
  {
    id: 4,
    name: 'euro',
    percentage: 0.98,
    value: 4.0026,
  },
  {
    id: 5,
    name: 'bitcoin',
    percentage: 0.98,
    value: 4.0026,
  },
  {
    id: 6,
    name: 'libras',
    percentage: 0.98,
    value: 4.0026,
  },
  {
    id: 7,
    name: 'dolar',
    percentage: 0.98,
    value: 4.0026,
  },
];

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
})
export class QuotesComponent {
  quotesList: IQuotes[] = quotesList;
}
