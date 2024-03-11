import { BrlCurrencyPipe } from './currency.pipe';

function normalizeString(str: string) {
  return str.normalize('NFKC');
}

describe('CurrencyPipe', () => {
  let pipe: BrlCurrencyPipe;

  beforeEach(() => {
    pipe = new BrlCurrencyPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a number value to currency format', () => {
    const value = 1234.56;
    const result = pipe.transform(value);
    expect(normalizeString(result)).toBe('R$ 1.234,56');
  });

  it('should transform a string value to currency format', () => {
    const value = '5678.90';
    const result = pipe.transform(value);

    expect(normalizeString(result)).toBe('R$ 5.678,90');
  });

  it('should return an empty string for non-numeric values', () => {
    const value = 'abc';
    const result = pipe.transform(value);
    expect(result).toBe('');
  });
});
