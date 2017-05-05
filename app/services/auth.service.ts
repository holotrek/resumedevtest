import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DateProvider } from '../providers/date.provider';
import { HttpProvider } from '../providers/http.provider';
import { SecurityProvider } from '../providers/security.provider';

import { User, MockUser } from '../domain/auth/user';
import { Session, MockSession } from '../domain/auth/session';

export interface IAuthService {
  CurrentUser: string;
  SessionCypher: string;
  login(userData: User): Promise<User>;
  register(userData: User): Promise<User>;
  logout(): Promise<void>;
  isAuthenticated(): boolean;
  bind(f: Function): void;
}

abstract class BaseAuthService implements IAuthService {
  protected events: Function[];
  protected user: User;
  protected session: Session;

  constructor(
    protected dateProv: DateProvider,
    protected security: SecurityProvider) {
    this.events = new Array<Function>();
  }

  public get CurrentUser(): string {
    return this.security.getEmail();
  }

  public get SessionCypher(): string {
    this.session = this.security.getSession();
    return this.session && this.session.SessionCypher ? this.session.SessionCypher : '';
  }

  public register(userData: User): Promise<User> {
    return this.registerOrLogin(userData);
  }

  public login(userData: User): Promise<User> {
    return this.registerOrLogin(userData);
  }

  public logout(): Promise<void> {
    this.security.clearAuth();
    for (let e of this.events) {
      e(false);
    }

    return Promise.resolve();
  }

  public isAuthenticated(): boolean {
    let email = this.security.getEmail();
    let session = this.security.getSession();

    if (email && session && session.SessionCypher) {
      if (session.ValidThrough > this.dateProv.getToday()) {
        return true;
      }
    }

    return false;
  }

  public bind(f: Function): void {
    this.events.push(f);
  }

  private registerOrLogin(userData: User): Promise<User> {
    this.user = userData;
    if (!this.user || !this.session) {
      return Promise.reject<User>('Not Authenticated');
    }

    // Fix the date to be a number of milliseconds to standardize it
    this.session.ValidThrough = this.dateProv.convertToNumber(this.dateProv.convertToDate(this.session.ValidThrough));

    this.security.storeEmail(this.user.EmailAddress);
    this.security.storeSession(this.session);
    for (let e of this.events) {
      e(true);
    }

    return Promise.resolve(this.user);
  }
}

@Injectable()
export class AuthService extends BaseAuthService implements IAuthService {

  constructor(
    dateProv: DateProvider,
    security: SecurityProvider,
    private http: HttpProvider) {
    super(dateProv, security);
  }

  public register(userData: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.createUser(userData).subscribe(
        (user: User) => this.getSession(userData).subscribe(
          (session: Session) => {
            this.session = session;
            super.register(userData);
            resolve(userData);
          },
          error => reject(error)),
        error => reject(error)
      );
    });
  }

  public login(userData: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.getSession(userData).subscribe(
        (session: Session) => {
          this.session = session;
          super.login(userData);
          resolve(userData);
        },
        error => reject(error)
      );
    });
  }

  private createUser(userData: User): Observable<{}> {
    return this.http.post('User', userData).map(this.http.extractData).catch(this.http.parseError);
  }

  private getSession(userData: User): Observable<{}> {
    return this.http.post('Session', userData).map(this.http.extractData).catch(this.http.parseError);
  }
}

@Injectable()
export class MockAuthService extends BaseAuthService implements IAuthService {

  constructor(
    dateProv: DateProvider,
    security: SecurityProvider) {
    super(dateProv, security);
  }

  public register(userData: User): Promise<User> {
    this.user = new MockUser();
    this.session = new MockSession(this.dateProv);
    return super.register(userData);
  }

  public login(userData: User): Promise<User> {
    this.user = new MockUser();
    this.session = new MockSession(this.dateProv);
    return super.login(userData);
  }
}
