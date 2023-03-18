import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { timeout } from 'rxjs/internal/operators/timeout';
import { environemt } from 'src/environments/environment';
import { CONSTANTS } from '../../helpers/constants';

@Injectable({ providedIn: 'root' })
export class GenericService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public get(
    url: string,
    params?: any
  ): Observable<any> {
    let reqConfig = {};
    if (params) {
      reqConfig = this.appendParams(params);
    }

    return this.httpClient
      .get(`${environemt.apiUrl}/${url}`, reqConfig)
      .pipe(
        timeout(CONSTANTS.API_TIMEOUT),
        catchError((err) => this.handleError(err))
      );
  }

  private appendParams(params: any) {
    const reqConfig: {params?: HttpParams} = {}
    reqConfig.params = new HttpParams({});
    Object.keys(params).forEach((key) => {
      reqConfig.params = reqConfig?.params?.append(key, params[key]);
    });
    return reqConfig;
  }

  /**
   * This method is for handling Server Errors
   *
   */
  private handleError(error: HttpErrorResponse): any {
    return throwError(() => error);
  }
}