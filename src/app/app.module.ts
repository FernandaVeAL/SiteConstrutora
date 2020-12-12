import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { ContatoComponent } from './contato/contato.component';
import { LoginComponent } from './auth/login/login.component';
import { UsuariosCadastrarComponent } from './auth/signup/usuarios-cadastrar/usuarios-cadastrar.component';
import { UsuariosConsultarComponent } from './auth/signup/usuarios-consultar/usuarios-consultar.component';
import { ObrasCadastrarComponent } from './obras/obras-cadastar/obras-cadastrar.component';
import { ObrasConsultarComponent } from './obras/obras-consultar/obras-consultar.component';
import { SolicitacaoObrasComponent } from './solicitacao-obras/solicitacao-obras.component';
import { DeleteComponent } from './auth/signup/usuarios-consultar/dialogs/delete/delete.component';
import { EditComponent } from './auth/signup/usuarios-consultar/dialogs/edit/edit.dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { MenuComponent } from './menu/menu.component';

import { ObraService } from './obras/obra.service';
import { UsuarioService } from './auth/usuario.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { AuthGuard } from './auth/auth.guard';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    ContatoComponent,
    LoginComponent,
    UsuariosCadastrarComponent,
    UsuariosConsultarComponent,
    ObrasCadastrarComponent,
    ObrasConsultarComponent,
    SolicitacaoObrasComponent,
    DeleteComponent,
    EditComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    AppRoutingModule,
    MatTableModule,
    MatListModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCarouselModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  entryComponents: [EditComponent, DeleteComponent],
  providers: [
    UsuarioService,
    ObraService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
