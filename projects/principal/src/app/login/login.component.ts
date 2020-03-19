import { Component, OnInit } from '@angular/core';
import { LoginService } from './service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {}

  logarComProviderGoogle() {
    this.loginService.loginGoogle().then(retorno => {
      if (!retorno.ok) {
        this.snackBar.open(retorno.error.message, 'ok');
      }
    });
  }

  logarComProviderGitHub() {
    this.loginService.loginGitHub().then(retorno => {
      if (!retorno.ok) {
        this.snackBar.open(retorno.error.message, 'ok');
      }
    });
  }

  ngOnInit(): void {}
}
