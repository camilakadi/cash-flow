import { Component } from '@angular/core';

export interface IQuotes {
  name: string;
  percentage: string;
  value: number;
  badgeColor: string;
}

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
})
export class QuotesComponent {
  quotesList!: IQuotes[];

  ngOnInit() {
    fetch(
      'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,ARS-BRL'
    )
      .then((response) => response.json())
      .then((data) => {
        this.quotesList = this.formatData(data);
      });
  }

  private formatData(data: any) {
    return Object.keys(data).map((key) => {
      return {
        name: this.convertName(data[key].code),
        value: data[key].bid,
        percentage: this.formatPercentage(data[key].pctChange),
        badgeColor: this.getBadgeColor(data[key].pctChange),
      };
    });
  }

  private convertName(name: string) {
    switch (name) {
      case 'USD':
        return 'Dólar';
      case 'EUR':
        return 'Euro';
      case 'BTC':
        return 'Bitcoin';
      case 'ARS':
        return 'Peso';
      default:
        return '';
    }
  }

  private formatPercentage(percentage: string) {
    const formated = percentage.replace('.', ',');

    if (formated.startsWith('-')) {
      return '-' + formated.substring(1);
    } else {
      return '+' + formated;
    }
  }

  private getBadgeColor(percentage: string) {
    if (percentage.startsWith('-')) {
      return 'red';
    } else {
      return 'green';
    }
  }
}
