import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  // Subject and observable for spinner.
  private spinner = new BehaviorSubject<boolean>(false);
  public spinner$ = this.spinner.asObservable();

  constructor() { }

  /**
   * Function which triggers the subscriber function to show or hide spinner.
   *
   * @param {boolean} state
   * @memberof LoaderService
   */
  public setSpinnerState(state: boolean) {
    this.spinner.next(state);
  }
}
