import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AuthenticationService } from "../../../../core/services/authentication.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgClass, NgIf, ButtonComponent],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _authenticationService: AuthenticationService,
    private readonly _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    const { email, password } = this.form.value;

    if (this.form.invalid) {
      return;
    }

    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    this._authenticationService
      .signIn(formData)
      .subscribe({
        next: (response) => {
          if (response.ok) {
            console.log(response)
            this._toastr.success('Glad to meet you');
            this._router.navigate(['/']).then();
          } else {
            this._toastr.error('Could not sign in');
            console.error(response);
          }
        },
        error: (error) => {
          this._toastr.error('Could not sign in');
          console.error(error)
        }
      })
  }
}
