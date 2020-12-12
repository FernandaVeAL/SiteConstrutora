import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContatoComponent } from './contato/contato.component';
import { LoginComponent } from './auth/login/login.component';
import { UsuariosCadastrarComponent } from './auth/signup/usuarios-cadastrar/usuarios-cadastrar.component';
import { UsuariosConsultarComponent } from './auth/signup/usuarios-consultar/usuarios-consultar.component';
import { ObrasCadastrarComponent } from './obras/obras-cadastar/obras-cadastrar.component';
import { ObrasConsultarComponent } from './obras/obras-consultar/obras-consultar.component';
import { SolicitacaoObrasComponent } from './solicitacao-obras/solicitacao-obras.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  {
    path: 'Obra/Cadastrar',
    component: ObrasCadastrarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Obra/Consultar',
    component: ObrasConsultarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Usuario/Cadastrar/:tipoUsuario',
    component: UsuariosCadastrarComponent,
  },
  {
    path: 'Usuario/Consultar/:tipoUsuario',
    component: UsuariosConsultarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Obra/Solicitar',
    component: SolicitacaoObrasComponent,
    canActivate: [AuthGuard],
  },
  { path: 'Contato', component: ContatoComponent },
  { path: 'Menu', component: MenuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
