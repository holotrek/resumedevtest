import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ValidationProvider, DEFAULT_MESSAGES, DEFAULT_PATTERNS } from '../../providers/validation.provider';
import { User } from '../../domain/auth/user';

@Component({
  selector: 'myresume-login',
  moduleId: module.id,
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  redirectUrl: string;
  user: User;

  formErrors = {
    'form': '',
    'EmailAddress': '',
    'Password': ''
  };

  validationMessages = {
    'EmailAddress': {
      'required': DEFAULT_MESSAGES.REQUIRED,
      'pattern': DEFAULT_MESSAGES.EMAIL
    },
    'Password': {
      'required': DEFAULT_MESSAGES.REQUIRED
    }
  };

  constructor(
    private auth: AuthService,
    private validator: ValidationProvider,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.user = new User();
    this.redirectUrl = this.route.snapshot.params['redirect'];
    this.buildForm();
  }

  login(): void {
    this.user = this.loginForm.value;
    if (this.loginForm.value.Register) {
      this.auth.register(this.user).then(() => {
        if (!this.redirectUrl) {
          this.redirectUrl = '/';
        }

        this.router.navigate([this.redirectUrl]);
      }).catch((err: any) => {
        this.formErrors.form = err;
      });
    }
    else {
      this.auth.login(this.user).then(() => {
        if (!this.redirectUrl) {
          this.redirectUrl = '/';
        }

        this.router.navigate([this.redirectUrl]);
      }).catch((err: any) => {
        this.formErrors.form = err;
      });
    }
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      'EmailAddress': [
        this.user.EmailAddress, [
          Validators.required,
          Validators.pattern(DEFAULT_PATTERNS.EMAIL)
        ]
      ],
      'Password': [
        this.user.Password, [
          Validators.required
        ]
      ],
      'Register': [
        false
      ]
    });

    this.validator.register(this.loginForm, this.formErrors, this.validationMessages);
  }
}
