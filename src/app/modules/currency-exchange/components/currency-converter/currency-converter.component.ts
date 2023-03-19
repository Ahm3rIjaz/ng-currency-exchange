import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { STORAGE } from 'src/app/modules/shared/helpers/enums';
import { FormDropdownItem } from 'src/app/modules/shared/interfaces/form.interface';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { StorageService } from 'src/app/modules/shared/services/storage.service';
import { ConverterForm, CurrencyConversionRecord, ExchangeHistoryStatistics } from '../../interfaces/currency-converter.interface';
import { CurrencyExchangeService } from '../../services/currency-exchange-api.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {

  form = new FormGroup({
    amount: new FormControl<number | null>(null, [Validators.required]),
    from: new FormControl<string>('', [Validators.required]),
    to: new FormControl<string>('', [Validators.required])
  } as ConverterForm);

  conversionData!: CurrencyConversionRecord;
  exchangeHistory: CurrencyConversionRecord[] = [];
  exchangeStatistics!: ExchangeHistoryStatistics;
  defaultHistoryDuration = 7;

  currenciesList: FormDropdownItem[] = [];
  filteredFromValues$!: Observable<FormDropdownItem[]>;
  filteredToValues$!: Observable<FormDropdownItem[]>;

  constructor(
    private readonly currencyExchangeService: CurrencyExchangeService,
    private readonly notification: NotificationService,
    private readonly storage: StorageService
  ) { }

  ngOnInit() {
    this.currencyExchangeService.getAllCurrencies()
      .subscribe(
        list => {
          this.currenciesList = list;
          this.filteredFromValues$ = this.getFilteredValues('from');
          this.filteredToValues$ = this.getFilteredValues('to');
        }
      )

    this.changeDuration(7);
  }

  exchangeRates() {
    console.log(this.form.value)

    if (this.form.invalid) {
      this.notification.show('Fill all values');
      return;
    }

    this.currencyExchangeService.convertCurrency(this.form.getRawValue()).subscribe(
      ({ success, motd, ...data }) => {
        if (!data.result) {
          this.notification.show('Error while exchanging.');
          return;
        }
        this.conversionData = data;
        this.storage.pushToArray(STORAGE.HISTORY, data);
        this.exchangeHistory = [data, ...this.exchangeHistory];
        this.exchangeStatistics = this.getStatistics();

      }
    )
  }

  swapFromAndTo() {
    const formValue = this.form.value;
    this.form.patchValue({
      from: formValue['to'],
      to: formValue['from']
    })
  }

  changeDuration(value: DurationOptions) {
    this.filterHistory(value);
    this.exchangeStatistics = this.getStatistics();
  }

  private getStatistics() {
    const { max, min } = this.getMostCommonCurrencies();
    return {
      totalExchanges: this.exchangeHistory.length,
      mostConvertedCurrency: max,
      leastConvertedCurrency: min
    }
  }

  getMostCommonCurrencies() {
    const groups: { [key: string]: { from: string; to: string; count: number } } = {};

    // Group the records by the 'from' and 'to' currency codes
    for (const record of this.exchangeHistory) {
      const { from, to } = record.query;
      const key = `${from}_${to}`;

      if (!groups[key]) {
        groups[key] = { from, to, count: 0 };
      }

      groups[key].count++;
    }

    // Sort the groups by count in descending order and return the top results
    const results = Object.values(groups).sort((a, b) => b.count - a.count);

    return {
      max: results[0],
      min: results[results.length - 1]
    };
  }

  private filterHistory(value: DurationOptions) {
    const daysInMS = { 7: 6.048e+8, 14: 1.21e+9, 30: 2.592e+9 }
    const history: CurrencyConversionRecord[] = this.storage.getAsJSON(STORAGE.HISTORY);

    this.exchangeHistory = history.filter(record => new Date().setHours(0, 0, 0, 0) - new Date(record.date).getTime() <= daysInMS[value]);
  }

  private getFilteredValues(formControlName: 'from' | 'to') {
    return this.form.controls[formControlName].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): FormDropdownItem[] {
    const filterValue = value.toLowerCase();

    return this.currenciesList.filter(({ label }) => label.toLowerCase().includes(filterValue));
  }
}

type DurationOptions = 7 | 14 | 30;
