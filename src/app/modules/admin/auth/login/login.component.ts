import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomService } from 'src/app/core/services/custom.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormControl | any;
  public passwordHide: boolean = true;
  public isSubmitted: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private customService: CustomService
  ) { }

  ngOnInit(): void {
    const localStorageToken = localStorage.getItem('accessToken');
    const localStorageUserInfo: any = localStorage.getItem('userInfo');
    const userData: any = JSON.parse(localStorageUserInfo);
    if (localStorageToken && userData) {
      sessionStorage.setItem('accessToken', localStorageToken);
      sessionStorage.setItem('userInfo', JSON.stringify(userData));
      this.apiService.setStorageData();
      this.router.navigate(['/admin/dashboard']);
    }
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get loginDetails() {
    return this.loginForm.controls;
  }

  submitLoginForm(): void {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      const payload = {
        email: this.loginDetails['email'].value,
        password: this.loginDetails['password'].value
      }
      this.apiService.doPost('auth/admin-login', payload)
        .subscribe((res: any) => {
          if (res.type == "success") {
            sessionStorage.setItem('accessToken', res.token);
            localStorage.setItem('accessToken', res.token);
            const userData: any = res.data;
            sessionStorage.setItem('userInfo', JSON.stringify(userData));
            localStorage.setItem('userInfo', JSON.stringify(userData));
            this.apiService.setStorageData();
            this.router.navigate(['/admin/dashboard']);
            this.customService.openSnackBar(res.message);
          } else {
            this.customService.openSnackBar(res.message);
          }
        });
    }
  }

  routeToRegister() {
    this.router.navigate(['admin/register']);
  }

  routeToForgot() {
    this.router.navigate(['admin/forgot-password']);
  }

}
