import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router,} from '@angular/router';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const {email, password} = this.signupForm.value;
      this._auth.register(email, password).subscribe(loginResponse => {
        const userInfo = loginResponse?.user?.multiFactor?.user;
        localStorage.setItem('user', JSON.stringify(userInfo));
        this.router.navigate(['/login']);
      })
    }

  }

  loginBtn() {
    this.router.navigate(['/login'])
  }

}





