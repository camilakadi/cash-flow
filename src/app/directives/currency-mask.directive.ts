import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCurrencyMask]',
})
export class CurrencyMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length === 0) {
      value = '0';
    }

    const currencyFormatted = this.formatCurrency(value);
    input.value = currencyFormatted;
  }

  private formatCurrency(value: string): string {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
    return formatter.format(parseInt(value) / 100);
  }
}
