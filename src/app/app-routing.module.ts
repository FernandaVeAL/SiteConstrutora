import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { ContatoComponent } from './contato/contato.component';
import { LoginComponent } from './auth/login/login.component';
import { UsuariosCadastrarComponent } from './auth/signup/usuarios-cadastrar/usuarios-cadastrar.component';
import { UsuariosConsultarComponent } from './auth/signup/usuarios-consultar/usuarios-consultar.component';
import { ObrasCadastrarComponent } from './obras/obras-cadastar/obras-cadastrar.component';
import { ObrasConsultarComponent } from './obras/obras-consultar/obras-consultar.component';
import { SolicitacaoObrasComponent } from './solicitacao-obras/solicitacao-obras.component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Obra/Cadastrar', component: ObrasCadastrarComponent },
  { path: 'Obra/Consultar', component: ObrasConsultarComponent },
  {
    path: 'Usuario/Cadastrar/:tipoUsuario',
    component: UsuariosCadastrarComponent,
  },
  {
    path: 'Usuario/Consultar/:tipoUsuario',
    component: UsuariosConsultarComponent,
  },
  { path: 'Obra/Solicitar', component: SolicitacaoObrasComponent },
  { path: 'Contato', component: ContatoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
