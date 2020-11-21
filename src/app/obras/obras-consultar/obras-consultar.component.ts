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

  columnsToDisplay = ['ID', 'Data de Início', 'Data de término', 'Cliente'];
  private obrasSubscription: Subscription;
  expandedElement: ObraService | null;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.obraService.getObras();
    this.obrasSubscription = this.obraService
      .getListaDeObrasAtualizadaObservable()
      .subscribe((obras: Obra[]) => {
        this.dataSource = new MatTableDataSource(obras);
      });
  }
}
