import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../models/login-usuario';
import { Jwt } from '../models/jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authURL = 'http://localhost:8090/login';

  constructor(private httpClient: HttpClient) {}

  /*   createAuthorizationHeader(): HttpHeaders {
    let headers = new HttpHeaders();

    headers = headers.append('content-Type', 'application/json');
    headers = headers.append('authorization', 'Basic ');
    return headers;
  } */

  /*   post(url, data) {
    let headers = this.createAuthorizationHeader();
    return this.http.post(url, data, { headers: headers });
  } */

  public login(loginUsuario: LoginUsuario): Observable<any> {
    console.log('Entra 1');

    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    headers.append(
      'Access-Control-Allow-Headers',
      'Origin, Content-Type, X-Auth-Token'
    );
    headers.append('Content-Type', 'application/json');

    /* const header = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*'); */

    return this.httpClient.post<any>(
      this.authURL,
      JSON.stringify({
        email: loginUsuario.email,
        password: loginUsuario.password,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        },
      }
    );

    /*     return this.httpClient.post(
      this.authURL,
      { email: loginUsuario.email, password: loginUsuario.password },
      {
        observe: 'response',
      }
    ); */
  }
}
