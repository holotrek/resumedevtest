// Angular
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs } from '@angular/http';

// RxJS
import './../rxjs-operators';
import { Observable } from 'rxjs/Observable';

import { SecurityProvider } from './security.provider';
import { SettingsProvider } from './settings.provider';

export interface IHttpProvider {
  get(url: string, options?: RequestOptionsArgs): Observable<Response>;
  delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
  post(url: string, data: any, options?: RequestOptionsArgs): Observable<Response>;
  put(url: string, data: any, options?: RequestOptionsArgs): Observable<Response>;
  parseError(error: Response | any): any;
  extractData(res: Response): any;
  extractText(res: Response): any;
}

@Injectable()
export class HttpProvider implements IHttpProvider {

  constructor(
    private http: Http,
    private settings: SettingsProvider,
  ) {
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    if (options) {
      return this.http.get(this.settings.Settings.api + url, options);
    }
    else {
      return this.http.get(this.settings.Settings.api + url);
    }
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    if (options) {
      return this.http.delete(this.settings.Settings.api + url, options);
    }
    else {
      return this.http.delete(this.settings.Settings.api + url);
    }
  }

  public post(url: string, data: any, options?: RequestOptionsArgs): Observable<Response> {
    if (options) {
      return this.http.post(this.settings.Settings.api + url, data, options);
    }
    else {
      return this.http.post(this.settings.Settings.api + url, data);
    }
  }

  public put(url: string, data: any, options?: RequestOptionsArgs): Observable<Response> {
    if (options) {
      return this.http.put(this.settings.Settings.api + url, data, options);
    }
    else {
      return this.http.put(this.settings.Settings.api + url, data);
    }
  }

  public parseError(error: Response | any): any {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = `${error.status} - ${error.statusText || ''}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  public extractData(res: Response): any {
    try {
      return res.json() || {};
    }
    catch (e) {
      return {};
    }
  }

  public extractText(res: Response): any {
    return res.text() || '';
  }
}

@Injectable()
export class SecureHttpProvider extends HttpProvider implements IHttpProvider {

  constructor(
    http: Http,
    settings: SettingsProvider,
    private security: SecurityProvider) {
    super(http, settings);
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.security.addAuthorizationHeader(options);
    return super.get(url, options);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.security.addAuthorizationHeader(options);
    return super.delete(url, options);
  }

  public post(url: string, data: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.security.addAuthorizationHeader(options);
    return super.post(url, data, options);
  }

  public put(url: string, data: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.security.addAuthorizationHeader(options);
    return super.put(url, data, options);
  }
}
