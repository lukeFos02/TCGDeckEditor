import { Component, OnInit } from '@angular/core';
import {AuthService} from '../Services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  form: any = {
    email: null,
    emailval: null,
    password: null,
    name: null,
  };
  isEmailValid: boolean = false;
  isSuccessful: boolean = false;
  isSignUpFailed: boolean = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const email = this.form.email;
    this.authService.verifyEmail(email).subscribe({
      next: data => {
        if (data === true) {
          this.register();
        }
        else {
          this.isSignUpFailed = true;
          this.errorMessage = "Email address is already in use."
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isEmailValid = false;
      }
    });
  }

  register() {
    const { email, password, name } = this.form;
    this.authService.register(email, password, name).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

}

