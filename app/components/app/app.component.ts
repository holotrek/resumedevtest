import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'myresume-app',
  moduleId: module.id,
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  title = 'Resume Developer Test';
  isAuthenticated: boolean;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated();
  }
}
