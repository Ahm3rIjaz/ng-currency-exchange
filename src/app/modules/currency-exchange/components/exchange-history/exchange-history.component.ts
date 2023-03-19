import { Component } from '@angular/core';
import { STORAGE } from 'src/app/modules/shared/helpers/enums';
import { StorageService } from 'src/app/modules/shared/services/storage.service';
import { CurrencyConversionRecord } from '../../interfaces/currency-converter.interface';

@Component({
  selector: 'app-exchange-history',
  templateUrl: './exchange-history.component.html',
  styleUrls: ['./exchange-history.component.scss']
})
export class ExchangeHistoryComponent {

  displayedColumns = ['date', 'description', 'rate', 'total'];
  dataSource: CurrencyConversionRecord[] = this.storage.getAsJSON(STORAGE.HISTORY);

  constructor(
    private readonly storage: StorageService
  ) {}
}
