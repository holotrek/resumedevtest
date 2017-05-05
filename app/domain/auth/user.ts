export class User {
  EmailAddress: string;
  Password: string;
}

export class MockUser extends User {
  EmailAddress = 'testuser@fake.com';
  Password = 'P@ssword#1';
}
