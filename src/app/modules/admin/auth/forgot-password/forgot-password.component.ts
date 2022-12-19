import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomService } from 'src/app/core/services/custom.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotpaswordForm: FormControl | any;
  public isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private customService: CustomService
  ) { }

  ngOnInit(): void {
    this.createForgotPassword();
  }

  createForgotPassword() {
    this.forgotpaswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]]
    });
  }

  get forgotPasswordDetails() {
    return this.forgotpaswordForm.controls;
  }

  submitForgotPaswordForm(): void {
    this.isSubmitted = true;
    if (this.forgotpaswordForm.valid) {
      const payload = {
        email: this.forgotPasswordDetails['email'].value
      }
      this.apiService.doPost('auth/forgotpassword', payload)
        .subscribe((res: any) => {
          if (res.type == "success") {
            this.customService.openSnackBar(res.message);
          }
          else {
            this.customService.openSnackBar(res.message);
          }
        });
    }
  }

  routeToLogin() {
    this.router.navigate(['/admin/login']);
  }

}

