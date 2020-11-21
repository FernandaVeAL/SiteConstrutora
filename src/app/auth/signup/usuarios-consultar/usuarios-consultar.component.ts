import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../usuario.model';
import { UsuarioService } from '../../usuario.service';
import { Subscription, Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EditComponent } from './dialogs/edit/edit.dialog';
import { DeleteComponent } from './dialogs/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-usuarios-consultar',
  templateUrl: './usuarios-consultar.component.html',
  styleUrls: ['./usuarios-consultar.component.css'],
})
export class UsuariosConsultarComponent implements OnInit, OnDestroy {
  paginaAtual: number = 1;
  totalDeUsuarios: number = 0;
  totalDeUsuariosPorPagina: number = 2;
  opcoesTotalDeUsuariosPorPagina: number[] = [2, 5, 10];
  public autenticado: boolean = false;
  private authObserver: Subscription;

  displayedColumns: string[] = [
    'nome',
    'cpf',
    'email',
    'telefone',
    'remover',
    'editar',
  ];
  dataSource = new MatTableDataSource<Usuario>();
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private usuariosSubscription: Subscription;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    public usuarioService: UsuarioService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.usuarioService.getUsuarios(
      this.totalDeUsuariosPorPagina,
      this.paginaAtual
    );
    this.usuariosSubscription = this.usuarioService
      .getListaDeUsuariosAtualizadaObservable()
      .subscribe((dados: { usuarios: []; maxUsuarios: number }) => {
        this.dataSource = new MatTableDataSource(dados.usuarios);
        this.totalDeUsuarios = dados.maxUsuarios;
      });
  }
  onPaginaAlterada(dadosPagina: PageEvent) {
    this.paginaAtual = dadosPagina.pageIndex + 1;
    this.totalDeUsuariosPorPagina = dadosPagina.pageSize;
    this.usuarioService.getUsuarios(
      this.totalDeUsuariosPorPagina,
      this.paginaAtual
    );
  }
  ngOnDestroy(): void {
    this.usuariosSubscription.unsubscribe();
  }

  OnDeleteItem(
    id: string,
    nome: string,
    email: string,
    cpf: string,
    telefone: string
  ) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { id: id, nome: nome, email: email, cpf: cpf, telefone: telefone },
    });
  }
  OnEditItem(
    id: string,
    nome: string,
    email: string,
    cpf: string,
    telefone: string
  ) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: { id: id, nome: nome, email: email, cpf: cpf, telefone: telefone },
    });
  }
}
