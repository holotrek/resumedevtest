import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { JsonProvider } from './json.provider';
import { StorageProvider } from './storage.provider';

export interface ISettingsProvider {
  Settings: any
}

@Injectable()
export class SettingsProvider implements ISettingsProvider {
  private SETTINGS_FILE: string = "./site.settings.json";
  private settings: any;

  constructor(
    private http: Http,
    private json: JsonProvider,
    private storage: StorageProvider) {
      this.initialize();
  }

  public get Settings(): any {
    return this.settings;
  }

  private initialize(): void {
    this.settings = this.storage.Local.get<any>(this.SETTINGS_FILE);
    if (this.settings) {
      return;
    }

    this.http.request(this.SETTINGS_FILE)
      .map((res: Response) => this.settings = res.json())
      .subscribe(res => this.setSettings(res));
  }

  private setSettings(settings: any): void {
    this.settings = settings;
    this.storage.Local.set(this.SETTINGS_FILE, settings);
  }
}
