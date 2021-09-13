import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <h1>Reactive Form</h1>
    <br /><br />
    <div>
      <h2>User Data</h2>
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" formControlName="name" />
        </div>
        <div *ngIf="userForm.controls['name'].hasError('required')">
          Please enter the name
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control" formControlName="email" />
        </div>
        <div *ngIf="userForm.controls['email'].hasError('required')">
          Please enter the Email
        </div>
        <div formGroupName="address">
          <div class="form-group">
            <label>Street</label>
            <input type="text" class="form-control" formControlName="street" />
          </div>
          <div *ngIf="street.hasError('required')">
          Please enter the Street
        </div>
          <div class="form-group">
            <label>City</label>
            <input type="text" class="form-control" formControlName="city" />
          </div>
          <div *ngIf="city.hasError('required')">
          Please enter the City
        </div>
          <div class="form-group">
            <label>Postal Code</label>
            <input type="text" class="form-control" formControlName="postalCode"/>
          </div>
          <div *ngIf="postalCode.hasError('required')">
          Please enter the Postal Code
        </div>
          <div *ngIf="postalCode.hasError('maxlength')">
            Pin Code should be less than 6 characters
          </div>
        </div>
        <button type="submit" [disabled]="!userForm.valid" class="btn btn-default">Submit</button>
      </form>
    </div>
  `,
  styles: [
    `
      input.ng-invalid {
        border-left: 5px solid red;
      }
      input.ng-valid {
        border-left: 5px solid green;
      }
    `
  ]
})
export class AppComponent {
  userForm = new FormGroup({
    name: new FormControl('Ankit', [Validators.required,Validators.minLength(4),Validators.maxLength(6)]),
    email: new FormControl("email@email.com",Validators.required),
    address: new FormGroup({
      street: new FormControl("street no.",Validators.required),
      city: new FormControl("city",Validators.required),
      postalCode: new FormControl(null, [
        Validators.minLength(4),
        Validators.maxLength(6)
      ])
    })
  });
  get postalCode() {
    return (this.userForm.controls['address'] as FormGroup).controls[
      'postalCode'
    ];
  }
  get street() {
    return (this.userForm.controls['address'] as FormGroup).controls[
      'street'
    ];
  }
  get city() {
    return (this.userForm.controls['address'] as FormGroup).controls[
      'city'
    ];
  }
  onSubmit() { 
    console.log(this.userForm.value);
  }
}
