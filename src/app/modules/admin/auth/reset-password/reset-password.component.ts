import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomService } from 'src/app/core/services/custom.service';
import { CustomValidator } from 'src/app/shared/validators/custom-validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public resetpaswordForm: FormGroup | any;
  public passwordHide: boolean = true;
  public ConfirmpasswordHide: boolean = true;
  public resetToken: any;
  public isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private customService: CustomService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.resetToken = params.get('resetToken');
    });
    this.resetpaswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      Validator: CustomValidator.ConfirmedValidator("password", "confirmPassword")
    });
  }

  get resetPasswordDetails() {
    return this.resetpaswordForm.controls;
  }


  submitResetpaswordForm(): void {
    this.isSubmitted = true;
    if (this.resetpaswordForm.valid) {
      const payload = {
        resetPasswordToken: this.resetToken,
        password: this.resetPasswordDetails['password'].value
      }
      this.apiService.doPost('auth/passwordreset', payload)
        .subscribe((res: any) => {
          if (res.type == "success") {
            this.customService.openSnackBar(res.message);
            this.router.navigate(['/admin/login']);
          }
          else {
            this.customService.openSnackBar(res.message);
          }
        });
    }
  }

}
