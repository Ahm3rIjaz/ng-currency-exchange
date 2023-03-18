import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { ExchangeHistoryComponent } from './components/exchange-history/exchange-history.component';
import { CurrencyExchangeRoutingModule } from './currency-exchange-routing.module';

const modules = [
  CurrencyExchangeRoutingModule,
  SharedModule
];

const components = [
  CurrencyConverterComponent,
  ExchangeHistoryComponent
]

@NgModule({
  imports: [...modules],
  exports: [],
  declarations: [...components],
  providers: [],
})
export class CurrencyExchangeModule { }
