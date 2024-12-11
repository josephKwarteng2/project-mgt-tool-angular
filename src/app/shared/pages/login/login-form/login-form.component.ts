import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../components/input/input.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { INVALID_INPUTS } from '../../../../contants/constants';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  protected emailErrorMsg = '';
  protected passwordErrorMsg = '';
  private _formBuilder = inject(FormBuilder);
  protected _loginForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected get emailControl() {
    return this._loginForm.get('email');
  }

  protected get passwordControl() {
    return this._loginForm.get('password');
  }

  onLogin() {}

  protected emailNotProvided(): string | undefined {
    if (this.emailControl?.touched && this.emailControl?.hasError('required')) {
      return INVALID_INPUTS.REQUIRED;
    } else if (
      this.emailControl?.touched &&
      this.emailControl?.hasError('email')
    ) {
      return INVALID_INPUTS.INVALID_EMAIL;
    }
    return undefined;
  }

  protected passwordNotProvided(): string | undefined {
    if (
      this.passwordControl?.touched &&
      this.passwordControl?.hasError('required')
    ) {
      return INVALID_INPUTS.REQUIRED;
    } else if (
      this.passwordControl?.touched &&
      this.passwordControl?.hasError('minlength')
    ) {
      return INVALID_INPUTS.MIN_LENGTH;
    }
    return undefined;
  }
}
