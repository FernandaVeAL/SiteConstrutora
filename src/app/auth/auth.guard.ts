import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const isAutenticado =
      sessionStorage.getItem('tipoUsuario') !== null &&
      sessionStorage.getItem('tipoUsuario') !== undefined;
    console.log(isAutenticado);
    console.log(sessionStorage.getItem('tipoUsuario'));
    if (!isAutenticado) {
      this.router.navigate(['/Menu']);
    }
    return isAutenticado;
  }
}
