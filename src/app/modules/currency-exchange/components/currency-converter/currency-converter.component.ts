import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { STORAGE } from 'src/app/modules/shared/helpers/enums';
import { FormDropdownItem } from 'src/app/modules/shared/interfaces/form.interface';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { StorageService } from 'src/app/modules/shared/services/storage.service';
import { ConverterForm, CurrencyConversionRecord } from '../../interfaces/currency-converter.interface';
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
  }

  exchangeRates() {
    console.log(this.form.value)

    if (this.form.invalid) {
      this.notification.show('Fill all values');
      return;
    }

    this.currencyExchangeService.convertCurrency(this.form.getRawValue()).subscribe(
      ({ success, motd, ...data }) => {
        if (!success) {
          this.notification.show('Error while exchanging.');
          return;
        }
        this.conversionData = data;
        this.storage.pushToArray(STORAGE.HISTORY, data);
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
