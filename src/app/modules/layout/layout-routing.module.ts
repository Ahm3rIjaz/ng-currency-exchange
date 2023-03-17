import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { LayoutComponent } from './components/layout/layout.component';

// Defining Routes and their child lazily
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'currency-exchange',
        loadChildren: () =>
          import('../currency-exchange/currency-exchange.module').then((m) => m.CurrencyExchangeModule),
      },
      { path: '**', pathMatch: 'prefix', redirectTo: 'currency-exchange' },
    ],
  },
  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
