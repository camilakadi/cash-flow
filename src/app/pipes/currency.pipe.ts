import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brlCurrency',
})
export class BrlCurrencyPipe implements PipeTransform {
  transform(value: number | string): string {
    const numberValue = typeof value === 'string' ? parseFloat(value) : value;
    if (!isNaN(numberValue)) {
      return numberValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    }
    return '';
  }
}
