import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonComponent} from 'src/app/shared/components/button/button.component';
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {NgClass, NgIf} from "@angular/common";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, ButtonComponent, NgIf, NgClass],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  validChecks: number = 0;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _authenticationService: AuthenticationService,
    private readonly _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')]]
    });

    this.form.controls['password'].valueChanges.subscribe((pw) => {
      this.updatePasswordIndicator(pw)
    })
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  updatePasswordIndicator(password: string) {
    this.validChecks = 0;

    if (/^.*[a-z]+.*$/.test(password)) {
      this.validChecks++;
    }
    if (/^.*[A-Z]+.*$/.test(password)) {
      this.validChecks++;
    }
    if (/^.*[0-9]+.*$/.test(password)) {
      this.validChecks++;
    }
    if (/^.*[!@#$%^&*_=+-]+.*$/.test(password)) {
      this.validChecks++;
    }
    if (password.length >= 8 && password.length <= 13) {
      this.validChecks++;
    }
  }

  onSubmit() {
    this.submitted = true;
    const { email, password } = this.form.value;

    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    this._authenticationService.signUp(formData).subscribe({
      next: (response) => {
        if (response.ok) {
          this._toastr.success('Glad to meet you');
          this._router.navigate(['/']).then();
        } else {
          this._toastr.error('Could not sign up');
          console.error(response);
        }
      },
      error: (error) => {
        this._toastr.error('Could not sign up');
        console.error(error);
      },
    });
  }
}
