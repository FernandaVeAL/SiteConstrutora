import { Obra } from './obra.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ObraService {
  private obras: Obra[] = [];
  private listaObrasAtualizada = new Subject<Obra[]>();
  constructor(private httpClient: HttpClient) {}

  adicionarObra(
    inicio: Date,
    termino: Date,
    tipo: string,
    porte: string,
    endereco: string,
    numero: Number,
    bairro: string,
    cidade: string,
    estado: string,
    complemento: string,
    cep: string,
    aviso: string,
    progresso: string,
    descricao: string
  ) {
    const obra: any = {
      id: null,
      inicio: inicio,
      termino: termino,
      tipo: tipo,
      porte: porte,
      endereco: endereco,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
      complemento: complemento,
      cep: cep,
      aviso: aviso,
      progresso: progresso,
      descricao: descricao,
    };
    this.obras.push(obra);
    this.listaObrasAtualizada.next([...this.obras]);
    this.httpClient
      .post<{ mensagem: string; id: string }>(
        'http://localhost:3000/api/obras',
        obra
      )
      .subscribe((dados) => {
        obra.id = dados.id;
        this.obras.push(obra);
        this.listaObrasAtualizada.next([...this.obras]);
      });
  }

  getListaDeObrasAtualizadaObservable() {
    return this.listaObrasAtualizada.asObservable();
  }
  getObras(): void {
    this.httpClient
      .get<{ mensagem: string; obras: any }>('http://localhost:3000/api/obras')
      .pipe(
        map((dados) => {
          return dados.obras.map((obra) => {
            return {
              id: obra._id,
              inicio: obra.inicio,
              termino: obra.termino,
              tipo: obra.tipo,
              porte: obra.porte,
              endereco: obra.endereco,
              numero: obra.numero,
              bairro: obra.bairro,
              cidade: obra.cidade,
              estado: obra.estado,
              complemento: obra.complemento,
              cep: obra.cep,
              aviso: obra.aviso,
              progresso: obra.progresso,
              descricao: obra.descricao,
              datap1: obra.data1,
              desp1: obra.desp1,
              datap2: obra.data2,
              desp2: obra.desp2,
              datap3: obra.data3,
              desp3: obra.desp3,
            };
          });
        })
      )
      .subscribe((obras) => {
        this.obras = obras;
        this.listaObrasAtualizada.next([...this.obras]);
      });
  }
  getObra(id: string) {
    return this.httpClient.get<{
      _id: string;
      inicio: Date;
      termino: Date;
      tipo: string;
      porte: string;
      endereco: string;
      numero: Number;
      bairro: string;
      cidade: string;
      estado: string;
      complemento: string;
      cep: string;
      aviso: string;
      progresso: string;
      descricao: string;
    }>(`http://localhost:3000/api/obras/${id}`);
  }

  removerObra(id: string): void {
    this.httpClient
      .delete(`http://localhost:3000/api/obras/${id}`)
      .subscribe(() => {
        this.obras = this.obras.filter((obr) => {
          return obr.id !== id;
        });
        this.listaObrasAtualizada.next([...this.obras]);
        console.log(`Obra de id: ${id} removido`);
      });
  }
  atualizarObra(
    id: string,
    inicio: Date,
    termino: Date,
    tipo: string,
    porte: string,
    endereco: string,
    numero: Number,
    bairro: string,
    cidade: string,
    estado: string,
    complemento: string,
    cep: string,
    aviso: string,
    progresso: string,
    descricao: string
  ) {
    const obra: any = {
      id,
      inicio,
      termino,
      tipo,
      porte,
      endereco,
      numero,
      bairro,
      cidade,
      estado,
      complemento,
      cep,
      aviso,
      progresso,
      descricao,
    };
    this.httpClient
      .put(`http://localhost:3000/api/obras/${id}`, obra)
      .subscribe((res) => {
        const copia = [...this.obras];
        const indice = copia.findIndex((obr) => obr.id === obra.id);
        copia[indice] = obra;
        this.obras = copia;
        this.listaObrasAtualizada.next([...this.obras]);
      });
  }
}
