import { Usuario } from './usuario.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private tipoUsuario: string;
  private autenticado: boolean = false;
  private token: string;
  private authStatusSubject = new Subject<boolean>();
  public getToken(): string {
    return this.token;
  }
  public getStatusSubject() {
    return this.authStatusSubject.asObservable();
  }
  public getTipoUsuario(): string {
    return this.tipoUsuario;
  }
  private usuarios: Usuario[] = [];
  private listaUsuariosAtualizada = new Subject<{
    usuarios: Usuario[];
    maxUsuarios: number;
  }>();
  constructor(private httpClient: HttpClient, private router: Router) {}

  adicionarUsuario(
    nome: string,
    email: string,
    cpf: string,
    telefone: string,
    senha: string,
    tipoUsuario: string
  ) {
    const usuario = {
      nome: nome,
      email: email,
      cpf: cpf,
      telefone: telefone,
      senha: senha,
      tipoUsuario: tipoUsuario,
    };
    // const dadosUsuario = new FormData();
    // dadosUsuario.append('nome', nome);
    // dadosUsuario.append('email', email);
    // dadosUsuario.append('cpf', cpf);
    // dadosUsuario.append('telefone', telefone);
    // dadosUsuario.append('senha', senha);
    // dadosUsuario.append('tipoUsuario', 'Cliente');

    this.httpClient
      .post<{ mensagem: string; usuario: Usuario }>(
        'http://localhost:3000/api/usuarios',
        usuario
      )
      .subscribe((dados) => {
        this.router.navigate(['/Login']);
      });
  }

  getListaDeUsuariosAtualizadaObservable() {
    return this.listaUsuariosAtualizada.asObservable();
  }
  getUsuarios(pagesize: number, page: number): void {
    const parametros = `?pagesize=${pagesize}&page=${page}`;
    this.httpClient
      .get<{ mensagem: string; usuarios: any; maxUsuarios: number }>(
        'http://localhost:3000/api/usuarios' + parametros
      )
      .pipe(
        map((dados) => {
          return {
            usuarios: dados.usuarios.map((usuario) => {
              return {
                id: usuario._id,
                nome: usuario.nome,
                cpf: usuario.cpf,
                email: usuario.email,
                telefone: usuario.telefone,
              };
            }),
            maxUsuarios: dados.maxUsuarios,
          };
        })
      )
      .subscribe((dados) => {
        this.usuarios = dados.usuarios;
        this.listaUsuariosAtualizada.next({
          usuarios: [...this.usuarios],
          maxUsuarios: dados.maxUsuarios,
        });
      });
  }
  getUsuario(id: string) {
    return this.httpClient.get<{
      _id: string;
      nome: string;
      fone: string;
      email: string;
    }>(`http://localhost:3000/api/Usuarios/${id}`);
  }

  removerUsuario(id: string) {
    return this.httpClient.delete(`http://localhost:3000/api/Usuarios/${id}`);
  }
  atualizarUsuario(
    id: string,
    nome: string,
    email: string,
    cpf: string,
    telefone: string
  ) {
    const usuarioData: any = {
      id: id,
      nome: nome,
      email: email,
      cpf: cpf,
      telefone: telefone,
    };
    this.httpClient
      .put(`http://localhost:3000/api/Usuarios/${id}`, usuarioData)
      .subscribe((res) => {
        this.router.navigate(['/Usuario/Consultar']);
      });
  }
  login(email: string, senha: string) {
    const authData: AuthData = {
      email: email,
      senha: senha,
    };
    this.httpClient
      .post<{ token: string; tipoUsuario: string }>(
        'http://localhost:3000/api/usuarios/login',
        authData
      )
      .subscribe((resposta) => {
        this.token = resposta.token;
        if (this.token) {
          this.autenticado = true;
          this.authStatusSubject.next(true);
          this.salvarDadosLocalmente(resposta.token, resposta.tipoUsuario);
        }
      });
  }
  logout() {
    this.token = null;
    this.authStatusSubject.next(false);
    localStorage.removeItem('tipoUsuario');
    this.tipoUsuario = null;
  }
  salvarDadosLocalmente(token: string, tipoUsuario: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('tipoUsuario', tipoUsuario);
  }
}
