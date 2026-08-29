import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInterface } from '../../core/interface/login.interface';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import Swal from 'sweetalert2';
import { PATH } from '../../core/enum/path.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLogin: boolean = false;

  private formBuilder = inject(FormBuilder);
  private usuarioService = inject(UsuariosService);
  private router = inject(Router);

  get formLogin() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.crearFormularioLogin();
  }

  crearFormularioLogin() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      remember: [false],
    });
  }

  login() {
    this.isLogin = true;

    if (this.loginForm.invalid) {
      return;
    }

    const data = this.loginForm.value;

    const loginData: LoginInterface = {
      email: data.email,
      password: data.password,
    };

    this.usuarioService.login(loginData).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Bienvenido al futuro!',
          icon: 'success',
          confirmButtonText: 'Continuar',
        }).then(() => this.router.navigateByUrl(PATH.HOME));
      },
      error: (error: unknown) => {
        Swal.fire({
          title: 'No pudimos iniciar sesión',
          text: error instanceof Error ? error.message : 'Credenciales incorrectas',
          icon: 'warning',
        });
      },
    });
  }
}
