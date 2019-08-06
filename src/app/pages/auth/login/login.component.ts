import { Router } from '@angular/router';
import { LoginCredentialsModel } from './../../../models/login-credentials.model';
import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'pyu-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private accountService: AccountService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.initAddFolderForm();
  }


  initAddFolderForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

  }

  ngAfterViewInit(): void {
    document.querySelectorAll('.fill input').forEach(elem => {
      elem.addEventListener('focus', function (e) {
        this.parentNode.classList.add('active');
      });
      elem.addEventListener('blur', function (e) {
        this.value ? this.parentNode.classList.add('active') : this.parentNode.classList.remove('active');
      });
    });
  }

  onLoginSubmit() {
    const crd: LoginCredentialsModel = {
      email: this.loginForm.get("email").value,
      password: this.loginForm.get("password").value
    }
    this.accountService.login(crd).subscribe(() => {
      console.log("LOGGED IN");
      this.router.navigate(['choose-workspace']);
    });
  }

}
