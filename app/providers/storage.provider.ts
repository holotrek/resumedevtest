import { Injectable } from '@angular/core';

import { JsonProvider } from './json.provider';

export interface IStorageProvider {
  Local: IStorage;
  Session: IStorage
}

export interface IStorage {
  get<T>(key: string): T;
  set(key: string, val: any): void;
  remove(key: string): void;
  clear(): void;
}

@Injectable()
export class StorageProvider implements IStorageProvider {
  private local: IStorage;
  private session: IStorage;

  constructor(private window: Window, private json: JsonProvider) {
    this.local = window.localStorage ? new WindowStorage(json, window.localStorage) : new MockStorage();
    this.session = window.sessionStorage ? new WindowStorage(json, window.sessionStorage) : new MockStorage();
  }

  public get Local(): IStorage {
    return this.local;
  }

  public get Session(): IStorage {
    return this.session;
  }
}

class MockStorage implements IStorage {
  private cache: { [key: string]: any; }

  constructor() {
    this.clear();
  }

  public get<T>(key: string): T {
    return this.cache[key];
  }

  public set(key: string, val: any): void {
    this.cache[key] = val;
  }

  public remove(key: string): void {
    this.cache[key] = undefined;
    delete this.cache[key];
  }

  public clear(): void {
    this.cache = {};
  }
}

class WindowStorage implements IStorage {
  constructor(private json: JsonProvider, private storage: Storage) {
  }

  public get<T>(key: string): T {
    let val = this.storage.getItem(key);
    if (!val || val === 'null') {
      return null;
    }

    try {
      return this.json.parse(val);
    }
    catch (e) {
      return null;
    }
  }

  public set(key: string, val: any): void {
    val = this.json.stringify(val);
    this.storage.setItem(key, val);
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }

  public clear(): void {
    this.storage.clear();
  }
}
