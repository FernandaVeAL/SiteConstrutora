import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { Obra } from '../obra.model';
import { ObraService } from '../obra.service';
import { Subscription } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-obras-consultar',
  templateUrl: './obras-consultar.component.html',
  styleUrls: ['./obras-consultar.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ObrasConsultarComponent implements OnInit {
  constructor(public obraService: ObraService) {}

  dataSource = new MatTableDataSource<Obra>();
  form: FormGroup;
  columnsToDisplay = ['id', 'inicio', 'termino', 'idCliente'];
  private obrasSubscription: Subscription;
  expandedElement: ObraService | null;
  editar = false;
  obra;
  public obras = [];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  confirmEdit(id: string): void {
    this.obraService.atualizarDataObra(
      id,
      this.form.value.datap1,
      this.form.value.desp1,
      this.form.value.datap2,
      this.form.value.desp2,
      this.form.value.datap3,
      this.form.value.desp3
    );
  }
  ngOnInit(): void {
    if (sessionStorage.getItem('tipoUsuario') == 'cliente') {
      this.obraService.getObrasById(sessionStorage.getItem('idUsuario'));
    } else {
      this.obraService.getObras();
    }
    this.obrasSubscription = this.obraService
      .getListaDeObrasAtualizadaObservable()
      .subscribe((obras: Obra[]) => {
        this.dataSource = new MatTableDataSource(obras);
        this.obras = obras;
      });
    this.form = new FormGroup({
      tipo: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(4)],
      }),
      porte: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      endereco: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(14)],
      }),
      numero: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(4)],
      }),
      bairro: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(8)],
      }),
      cidade: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(8)],
      }),
      estado: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(8)],
      }),
      complemento: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(8)],
      }),
      cep: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(8)],
      }),
    });
  }
  showEdit(id: string) {
    this.editar = true;
    this.dataSource.data.map((obra) => obra);
    this.obra = this.obras.find((obra: Obra) => {
      return obra.id === id;
    });
    console.log(this.obra);
    this.form.patchValue({
      inicio: this.obra.inicio,
      termino: this.obra.termino,
      tipo: this.obra.tipo,
      porte: this.obra.porte,
    });
    this.form.updateValueAndValidity();
  }
  hideEdit(id: string) {
    this.editar = false;
  }
}
