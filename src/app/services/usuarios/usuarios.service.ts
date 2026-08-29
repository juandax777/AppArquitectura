import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginInterface } from '../../core/interface/login.interface';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { PATH } from '../../core/enum/path.enum';
import { UsuarioModel } from '../../core/models/usuario.model';
import { crearUsuarioInterface } from '../../core/interface/usuario.interface';

const base_url = environment.base_url;
const DEMO_USER = {
  email: 'juan@mail.com',
  password: 'juan123',
};
const DEMO_TOKEN = 'app-arquitectura-demo-session';
@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private router = inject(Router);

  usuario: UsuarioModel;

  constructor(private httpClient: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  validateToken(): Observable<boolean> {
    const isAuthenticated = this.token === DEMO_TOKEN;

    if (isAuthenticated) {
      this.setDemoUser();
    }

    return of(isAuthenticated);
  }

  login(login: LoginInterface): Observable<{ usuario: UsuarioModel }> {
    const credentialsAreValid =
      login.email.trim().toLowerCase() === DEMO_USER.email &&
      login.password === DEMO_USER.password;

    if (!credentialsAreValid) {
      return throwError(() => new Error('Correo o contraseña incorrectos'));
    }

    this.setDemoUser();
    localStorage.setItem('token', DEMO_TOKEN);

    return of({ usuario: this.usuario });
  }

  private setDemoUser(): void {
    this.usuario = new UsuarioModel(
      'demo-user',
      'Usuario Demo',
      DEMO_USER.email,
      'CC',
      '0000000000',
      'ADMIN'
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl(PATH.LOGIN);
  }

  getUsuarios() {
    return this.httpClient.get(`${base_url}/usuario`, this.headers);
  }

  getUnUsuario(id: string) {
    console.log('id', id);
    return this.httpClient.get(`${base_url}/usuario/${id}`, this.headers);
  }

  crearUsuario(usuario: crearUsuarioInterface) {
    return this.httpClient.post(`${base_url}/usuario`, usuario, this.headers);
  }

  actualizarUsuario(usuario: UsuarioModel) {
    return this.httpClient.put(
      `${base_url}/usuario/${usuario._id}`,
      usuario,
      this.headers
    );
  }

  eliminarUsuario(id: string) {
    return this.httpClient.delete(`${base_url}/usuario/${id}`, this.headers);
  }
}
