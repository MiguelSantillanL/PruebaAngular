import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { LoginRequest } from '../model/login.model';
import { Router } from '@angular/router';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formLogin?: FormGroup;
  isLoading: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginSrv: LoginService,
    private router: Router,
    private utilSrv: UtilService
  ) {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginClick() {
    this.isLoading = true;
    console.log('click en el Login!!');
    console.log('value form ', this.formLogin?.value);
    const req = this.formLogin?.value as LoginRequest;
    this.loginSrv.login(req).subscribe({
      next: (response) => {
        console.log('RESPUESTA: ', response);
        this.utilSrv.saveToken(response.token);
        this.router.navigate(['home']);
      },
      error: (error) => {
        this.isLoading = false;
        console.log('ERROR!!: ', error);
      },
      complete: () => {
        this.isLoading = false;
        console.log('COMPLETED');
      },
    });
    console.log('Ya se envio la peticion');
  }
}
