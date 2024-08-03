import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      this._auth.login(email, password).subscribe(loginResponse => {
        const userInfo = loginResponse?.user?.multiFactor?.user;
        localStorage.setItem('user', JSON.stringify(userInfo));
        this.router.navigate(['/main']);
      })
    }

  }

  createOne() {
    this.router.navigate(['/signup'])
  }
}
