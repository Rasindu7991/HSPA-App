import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { User } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registrationForm: FormGroup;
  user: User;
  userSubmitted: boolean;

  constructor(private fb: FormBuilder, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    // this.registrationForm = new FormGroup({
    //     userName : new FormControl(null, Validators.required),
    //     email : new FormControl(null, [Validators.required, Validators.email]),
    //     password : new FormControl(null, [Validators.required, Validators.minLength(5)]),
    //     confirmPassword : new FormControl(null, Validators.required),
    //     mobile : new FormControl(null, [Validators.required, Validators.maxLength(10)])
    // }, this.passwordMatchingValidator);
    this.createRegistrationForm();
  }

  createRegistrationForm(){
    this.registrationForm = this.fb.group({
        userName : [null, Validators.required],
        email :  [null, [Validators.required, Validators.email]],
        password :  [null, [Validators.required, Validators.minLength(5)]],
        confirmPassword : [null, Validators.required],
        mobile :  [null, [Validators.required, Validators.maxLength(10)]]
    }, {validators : this.passwordMatchingValidator});
  }

  onSubmit(){
    console.log(this.registrationForm.value);
    this.userSubmitted = true;
    if (this.registrationForm.valid){
      // this.user = Object.assign(this.user, this.registrationForm.value);

      this.userService.addUsers(this.userdata());
      this.registrationForm.reset();
      this.userSubmitted = false;
      this.alertify.success('User registered successfully!!!');
    }
    else
    {
      this.alertify.error('Please provide required fields!!!');
    }
  }

  userdata(): User{
    return this.user = {
      userName : this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value
    };
  }

  passwordMatchingValidator(formgroup: FormGroup): Validators{
    return formgroup.get('password').value === formgroup.get('confirmPassword').value ? null : {notMatched: true};
  }

  // Getter methods
  get userName(){
    return this.registrationForm.get('userName') as FormControl;
  }

  get email(){
    return this.registrationForm.get('email') as FormControl;
  }

  get password(){
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword(){
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  get mobile(){
    return this.registrationForm.get('mobile') as FormControl;
  }

}
