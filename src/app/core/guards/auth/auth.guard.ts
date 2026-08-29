import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { PATH } from '../../enum/path.enum';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const usuariosService = inject(UsuariosService);
  const router = inject(Router);

  return usuariosService
    .validateToken()
    .pipe(map((isAuthenticated) => isAuthenticated || router.createUrlTree([PATH.LOGIN])));
};
