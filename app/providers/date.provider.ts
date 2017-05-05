import { Injectable } from '@angular/core';
import * as moment from 'moment';

export interface IDateProvider {
  convertToDate(date: any): Date;
  convertToNumber(date: Date): number;
  getToday(): number;
  getTomorrow(): number;
}

@Injectable()
export class DateProvider implements IDateProvider {
  constructor() {
  }

  public convertToDate(date: any): Date {
    if (date.getTime) {
      return date;
    }
    else if (typeof date == 'number') {
      return new Date(date);
    }
    else {
      return moment(date).toDate();
    }
  }

  public convertToNumber(date: Date): number {
    return date.getTime();
  }

  public getToday(): number {
    return new Date().getTime();
  }

  public getTomorrow(): number {
    let d = new Date();
    d.setDate(d.getDate() + 1);
    return d.getTime();
  }
}
