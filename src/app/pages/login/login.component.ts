import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ds-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isError: boolean = false;
  errorCode: number;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.form = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.form.valueChanges.subscribe(() => {
      this.isError = false;
    });
  }

  ngOnInit(): void {}

  submit() {
    const { username, password } = this.form.value;
    this._authService.login(username, password).subscribe(
      (token) => {
        this._router.navigateByUrl('/tasks');
      },
      (err) => {
        this.isError = true;
        if (err.status === 401) {
          this.errorCode = 401;
        } else {
          this.errorCode = 0;
        }
      }
    );
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }
}
