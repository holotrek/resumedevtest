import { Injectable } from '@angular/core';

export interface IJsonProvider {
  parse(val: string): any;
  stringify(val: any): string;
}

@Injectable()
export class JsonProvider implements IJsonProvider {
  public parse(val: string): any {
    return JSON.parse(val);
  }

  public stringify(val: any): string {
    return JSON.stringify(val);
  }
}
