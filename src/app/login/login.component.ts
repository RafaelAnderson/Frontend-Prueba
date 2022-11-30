import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUsuario } from '../models/login-usuario';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  usuarioVacio: boolean = true;
  contrasenaVacia: boolean = true;

  formLogin: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.maxLength(30)]],
    contrasena: ['', [Validators.required, Validators.maxLength(30)]],
  });

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
    }
  }

  Ingresar() {
    let nombre = this.formLogin.get('userName')!.value;
    let password = this.formLogin.get('contrasena')!.value;

    this.nombreUsuario = nombre;
    this.password = password;

    this.onLogin();
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    console.log(this.loginUsuario);

    this.authService.login(this.loginUsuario).subscribe((data) => {
      console.log(data);
    });

    /* const headers = response.getHeaders();
      const names = headers.getAll();
      names.forEach((headerName: any) => {
        console.log(headerName, headers.get(headerName));
      }); */

    /* this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;
        this.isLoginFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
      },
      (err) => {
        this.isLogged = false;
        this.isLoginFail = true;
      }
    ); */
  }
}
