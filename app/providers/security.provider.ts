import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { DateProvider } from './date.provider';
import { JsonProvider } from './json.provider';
import { StorageProvider } from './storage.provider';

import { Session } from '../domain/auth/session';

export interface ISecurityProvider {
  storeEmail(email: string): void;
  storeSession(session: Session): void;
  getEmail(): string;
  getSession(): Session;
  clearAuth(): void;
}

@Injectable()
export class SecurityProvider implements ISecurityProvider {
  protected USER_STORAGE_KEY: string = 'MyResumeUser';
  protected SESSION_STORAGE_KEY: string = 'MyResumeSession';
  protected AUTH_HEADER: string = 'Authorization';

  constructor(
    protected dateProv: DateProvider,
    protected json: JsonProvider,
    protected storage: StorageProvider) {
  }

  public addAuthorizationHeader(options: any): any {
    if (!options) { options = {}; }
    let headers = new Headers();
    headers.append(this.AUTH_HEADER, this.getSession().SessionCypher);
    options = {
      headers: headers
    };
    return options;
  }

  public storeEmail(email: string): void {
    this.storage.Session.set(this.USER_STORAGE_KEY, email);
  }

  public storeSession(session: Session): void {
    this.storage.Session.set(this.SESSION_STORAGE_KEY, session);
  }

  public getEmail(): string {
    return this.storage.Session.get<string>(this.USER_STORAGE_KEY);
  }

  public getSession(): Session {
    return this.storage.Session.get<Session>(this.SESSION_STORAGE_KEY);
  }

  public clearAuth(): void {
    this.storage.Session.remove(this.USER_STORAGE_KEY);
    this.storage.Session.remove(this.SESSION_STORAGE_KEY);
  }
}
