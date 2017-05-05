import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'myresume-menu',
  moduleId: module.id,
  templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit {
  @Input() title: string;
  curUser: string;
  isAuthenticated: boolean;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() : void {
    this.auth.bind((isAuth: boolean) => this.loginStateChanged(isAuth));
    this.loginStateChanged(this.auth.isAuthenticated());
  }

  loginStateChanged(isAuth: boolean): void {
    this.isAuthenticated = isAuth;
    this.curUser = this.auth.CurrentUser;
  }

  logOut(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
