import { FormControl } from "@angular/forms";

export interface ConverterForm {
  amount: FormControl<number>;
  from: FormControl<string>;
  to: FormControl<string>;
}

export interface CurrencyConverterApiResponse {
  date: string;
  info: {rate: number};
  result: number;
  success: boolean;
  query: CurrencyConverter
}

export interface CurrencyConverter {
  amount: number;
  from: string;
  to: string;
}