import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GenericService } from '../../shared/services/http/generic.service';
import { CurrencyConverter, CurrencyConverterApiResponse } from '../interfaces/currency-converter.interface';

@Injectable({ providedIn: 'root' })
export class CurrencyExchangeService {
  constructor(private genericService: GenericService) { }

  getAllCurrencies(): Observable<any> {
    return this.genericService.get('symbols')
      .pipe(
        map(
          ({ symbols }: { symbols: { [key: string]: { description: string, code: string } } }) => {
            return Object.entries(symbols).map(([key, { description, code }]) => ({ label: `${description} (${key})`, value: key }))
          }
        )
      )
  }

  convertCurrency({ amount, from, to }: CurrencyConverter): Observable<CurrencyConverterApiResponse> {
    return this.genericService.get('convert', {
      from,
      to,
      amount
    })
  }
}
