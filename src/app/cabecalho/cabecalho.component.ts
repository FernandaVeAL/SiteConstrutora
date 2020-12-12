import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../auth/usuario.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
})
export class CabecalhoComponent implements OnInit, OnDestroy {
  private authObserver: Subscription;
  public autenticado: boolean = false;
  public tipoUsuario: string;
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.authObserver = this.usuarioService
      .getStatusSubject()
      .subscribe((autenticado) => {
        console.log(autenticado);
        this.autenticado = autenticado;
        this.tipoUsuario = this.autenticado
          ? sessionStorage.getItem('tipoUsuario')
          : 'Sem Resultado';
        console.log(this.tipoUsuario);
      });
    this.tipoUsuario = this.usuarioService.getTipoUsuario();
  }
  ngOnDestroy() {
    this.authObserver.unsubscribe();
  }
  onLogout() {
    this.usuarioService.logout();
  }
}
