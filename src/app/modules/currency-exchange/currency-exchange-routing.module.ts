import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CurrencyConverterComponent } from "./components/currency-converter/currency-converter.component";
import { ExchangeHistoryComponent } from "./components/exchange-history/exchange-history.component";

const routes = [
  { path: '', component: CurrencyConverterComponent },
  { path: 'history', component: ExchangeHistoryComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrencyExchangeRoutingModule { }