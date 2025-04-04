import {Component, OnInit} from '@angular/core';
import {AuthService} from '../Services/auth.service';
import {StorageService} from '../Services/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  name: string | undefined;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
              private storageService: StorageService,
              private router: Router,) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.name = this.storageService.getUser().userName;
      console.log(this.storageService.getUser());
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: data => {
        console.log(data);
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.name = this.storageService.getUser().userName;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
    this.router.navigate(['MyDecks']);
    console.log(this.storageService.getUser())
  }

  reloadPage(): void {
    window.location.reload();
  }
}

