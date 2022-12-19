import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public checkoutForm:any;

  constructor(
    private formBuilder:FormBuilder,
    
  ) { }

  ngOnInit(): void {
    this.createCheckoutForm();
  }

  createCheckoutForm() {
    this.checkoutForm = this.formBuilder.group({
      addressDetails: this.formBuilder.group({
        name: ['', [Validators.required]],
        category: ['', [Validators.required]],
        fileURL: ['', [Validators.required]]
      }),
      thumbnailDetails: this.formBuilder.group({
        thumbnail: ['', [Validators.required]]
      }),
      paymentDetails: this.formBuilder.group({
        visibility: ['', [Validators.required]],
        scale: ['']
      })
    });
  }

}
