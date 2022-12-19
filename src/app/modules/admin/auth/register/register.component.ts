import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomService } from 'src/app/core/services/custom.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup | any;
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
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get registerDetails() {
    return this.registerForm.controls;
  }

  submitRegisterForm(): void {
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      const payload = {
        username: this.registerDetails['username'].value,
        email: this.registerDetails['email'].value,
        password: this.registerDetails['password'].value,
        role: "admin"
      }
      this.apiService.doPost('auth/register', payload)
        .subscribe((res: any) => {
          if (res.type == "success") {
            this.updateLogin();
          } else {
            this.customService.openSnackBar(res.message);
          }
        });
    }
  }

  updateLogin() {
    const payload = {
      email: this.registerDetails['email'].value,
      password: this.registerDetails['password'].value
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
          this.customService.openSnackBar("Register Successfully");
        } else {
          this.customService.openSnackBar(res.message);
        }
      });

  }

  routeToLogin() {
    this.router.navigate(['/admin/login']);
  }

}
