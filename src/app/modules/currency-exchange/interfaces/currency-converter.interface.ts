import { FormControl } from "@angular/forms";

export interface ConverterForm {
  amount: FormControl<number>;
  from: FormControl<string>;
  to: FormControl<string>;
}

export interface CurrencyConversionRecord {
  date: string;
  info: { rate: number };
  result: number;
  query: CurrencyConverter;
}

export interface CurrencyConverterApiResponse extends CurrencyConversionRecord {
  success: boolean;
  motd?: unknown;
}

export interface ExchangeHistoryStatistics {
  totalExchanges: number;
  mostConvertedCurrency: ConversionCount;
  leastConvertedCurrency: ConversionCount;
}

export interface CurrencyConverter {
  amount: number;
  from: string;
  to: string;
}

interface ConversionCount {
  from: string;
  to: string;
  count: number
}