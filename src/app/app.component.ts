import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  template:`
  <h1>Reactive Form</h1><br><br>
  <div>
    <h2>User Data</h2>
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" formControlName="name" >
      </div>
      <div *ngIf="userForm.controls['name'].hasError('required')">
        Please enter the name
      </div>
      <div *ngIf="userForm.controls['name'].hasError('minlength')">
        Pin Code should be greaater than 4 characters
      </div>
      <div *ngIf="userForm.controls['name'].hasError('maxlength')">
        Pin Code should be less than 6 characters
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="text" class="form-control" formControlName="email">
      </div>
      <div formGroupName ="address">
        <div class="form-group">
          <label>Street</label>
          <input type="text" class="form-control" formControlName="street">
        </div>
        <div class="form-group">
          <label>City</label>
          <input type="text" class="form-control" formControlName="city">
        </div>
        <div class="form-group">
          <label>Postal Code</label>
          <input type="text" class="form-control" formControlName="postalCode">
        </div>
        <div *ngIf="userForm.controls['address'].controls['postalCode'].hasError('minlength')">
        Pin Code should be greaater than 4 characters
      </div>
      <div *ngIf="userForm.controls['address'].controls['postalCode'].hasError('maxlength')">
        Pin Code should be less than 6 characters
      </div>
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
  </div>
  


  `,
  styles :[`
    input.ng-invalid{border-left: 5px solid red}
    input.ng-valid{border-left: 5px solid green}
  `]
})
export class AppComponent {
  userForm = new FormGroup({
    name : new FormControl("Ankit",[Validators.required,Validators.minLength(4),Validators.maxLength(6)]),
    email : new FormControl(),
    address : new FormGroup({
      street : new FormControl(),
      city : new FormControl(),
      postalCode : new FormControl(null,[Validators.minLength(4),Validators.maxLength(6)])
    })
  })
  onSubmit(){
    console.log(this.userForm.value)
  }
}