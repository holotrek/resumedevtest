import { DateProvider } from '../../providers/date.provider'

export class Session {
  SessionCypher: string;
  ValidThrough: number;
}

export class MockSession extends Session {
  constructor(private dateProv: DateProvider) {
    super();
    this.ValidThrough = this.dateProv.getTomorrow();
    this.SessionCypher = 'TestSessionCypher';
  }
}
