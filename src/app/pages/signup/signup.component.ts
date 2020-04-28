import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService, UserService } from '@core/services';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ds-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  isError: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _userService: UserService,
    private _router: Router
  ) {
    this.form = this._fb.group({
      username: [
        '',
        [Validators.required, Validators.minLength(3)],
        [this._usernameUsedValidator()],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userType: ['S', Validators.required],
    });
    this.form.valueChanges.subscribe(() => {
      this.isError = false;
    });
  }

  ngOnInit(): void {}

  submit() {
    this._authService.register(this.form.value).subscribe(
      (token) => {
        this._router.navigateByUrl('/tasks');
      },
      (err) => {
        this.isError = true;
      }
    );
  }

  private _usernameUsedValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const subs = this._authService.checkUsername(control.value);
      if (subs)
        return subs.pipe(
          map((used) => {
            return used ? { usernameUsed: { value: control.value } } : null;
          })
        );
      return of(null);
    };
  }

  get username() {
    return this.form.get('username');
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get password() {
    return this.form.get('password');
  }
}
