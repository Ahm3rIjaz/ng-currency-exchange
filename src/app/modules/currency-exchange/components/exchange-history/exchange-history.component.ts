import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { STORAGE } from 'src/app/modules/shared/helpers/enums';
import { StorageService } from 'src/app/modules/shared/services/storage.service';
import { CurrencyConversionRecord } from '../../interfaces/currency-converter.interface';

@Component({
  selector: 'app-exchange-history',
  templateUrl: './exchange-history.component.html',
  styleUrls: ['./exchange-history.component.scss']
})
export class ExchangeHistoryComponent implements OnChanges, AfterViewInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() data: CurrencyConversionRecord[] = this.storage.getAsJSON(STORAGE.HISTORY);

  displayedColumns = ['date', 'description', 'rate', 'total'];
  dataSource!: MatTableDataSource<CurrencyConversionRecord>;

  constructor(
    private readonly storage: StorageService
  ) {}

  ngAfterViewInit() {
    this.tableSettings();
  }

  ngOnChanges() {
    this.tableSettings();
  }

  private tableSettings() {
    this.dataSource = new MatTableDataSource<CurrencyConversionRecord>(this.data);
    this.dataSource.paginator = this.paginator;
  }
}
