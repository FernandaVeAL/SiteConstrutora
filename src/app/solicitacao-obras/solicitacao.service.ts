import { Solicitacao } from './solicitacao.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SolicitacaoService {
  private solicitacoes: Solicitacao[] = [];
  private listaSolicitacoesAtualizada = new Subject<Solicitacao[]>();
  constructor(private httpClient: HttpClient, private router: Router) {}

  adicionarSolicitacao(
    tipo: string,
    porte: string,
    endereco: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string,
    complemento: string,
    cep: string,
    idUsuario: string,
    imagem: File
  ) {
    // const solicitacao: any = {
    //   id: null,
    //   tipo: tipo,
    //   porte: porte,
    //   endereco: endereco,
    //   numero: numero,
    //   bairro: bairro,
    //   cidade: cidade,
    //   estado: estado,
    //   complemento: complemento,
    //   cep: cep,
    //   idUsuario: idUsuario,
    // };

    const dadosSolicitacao = new FormData();
    dadosSolicitacao.append('tipo', tipo);
    dadosSolicitacao.append('porte', porte);
    dadosSolicitacao.append('endereco', endereco);
    dadosSolicitacao.append('numero', numero);
    dadosSolicitacao.append('bairro', bairro);
    dadosSolicitacao.append('cidade', cidade);
    dadosSolicitacao.append('estado', estado);
    dadosSolicitacao.append('complemento', complemento);
    dadosSolicitacao.append('cep', cep);
    dadosSolicitacao.append('idUsuario', idUsuario);
    dadosSolicitacao.append('imagem', imagem);

    this.listaSolicitacoesAtualizada.next([...this.solicitacoes]);
    this.httpClient
      .post<{ mensagem: string; solicitacao: Solicitacao }>(
        'http://localhost:3000/api/solicitacoes',
        dadosSolicitacao
      )
      .subscribe((dados) => {
        const solicitacao: Solicitacao = {
          id: dados.solicitacao.id,
          tipo: tipo,
          porte: porte,
          endereco: endereco,
          numero: numero,
          bairro: bairro,
          cidade: cidade,
          estado: estado,
          complemento: complemento,
          cep: cep,
          idUsuario: idUsuario,
          imagemURL: dados.solicitacao.imagemURL,
        };
        this.solicitacoes.push(solicitacao);
        this.listaSolicitacoesAtualizada.next([...this.solicitacoes]);
        this.router.navigate(['/Menu']);
      });
  }

  getListaDeSolicitacoesAtualizadaObservable() {
    return this.listaSolicitacoesAtualizada.asObservable();
  }
  getObras(): void {
    this.httpClient
      .get<{ mensagem: string; solicitacoes: any }>(
        'http://localhost:3000/api/solicitacoes'
      )
      .pipe(
        map((dados) => {
          return dados.solicitacoes.map((solicitacao) => {
            return {
              id: solicitacao._id,
              tipo: solicitacao.tipo,
              porte: solicitacao.porte,
              endereco: solicitacao.endereco,
              numero: solicitacao.numero,
              bairro: solicitacao.bairro,
              cidade: solicitacao.cidade,
              estado: solicitacao.estado,
              complemento: solicitacao.complemento,
              cep: solicitacao.cep,
              cliente: solicitacao.cliente,
            };
          });
        })
      )
      .subscribe((solicitacoes) => {
        this.solicitacoes = solicitacoes;
        this.listaSolicitacoesAtualizada.next([...this.solicitacoes]);
      });
  }
  getSolicitacao(id: string) {
    return this.httpClient.get<{
      _id: string;
      tipo: string;
      porte: string;
      endereco: string;
      numero: Number;
      bairro: string;
      cidade: string;
      estado: string;
      complemento: string;
      cep: string;
      cliente: string;
    }>(`http://localhost:3000/api/solicitacoes/${id}`);
  }

  removerSolicitacao(id: string): void {
    this.httpClient
      .delete(`http://localhost:3000/api/solicitacoes/${id}`)
      .subscribe(() => {
        this.solicitacoes = this.solicitacoes.filter((obr) => {
          return obr.id !== id;
        });
        this.listaSolicitacoesAtualizada.next([...this.solicitacoes]);
        console.log(`Solicitacao de id: ${id} removido`);
      });
  }
  atualizarSolicitacao(
    id: string,
    tipo: string,
    porte: string,
    endereco: string,
    numero: Number,
    bairro: string,
    cidade: string,
    estado: string,
    complemento: string,
    cep: string,
    cliente: string
  ) {
    const solicitacao: any = {
      id,
      tipo,
      porte,
      endereco,
      numero,
      bairro,
      cidade,
      estado,
      complemento,
      cep,
      cliente,
    };
    this.httpClient
      .put(`http://localhost:3000/api/solicitacao/${id}`, solicitacao)
      .subscribe((res) => {
        const copia = [...this.solicitacoes];
        const indice = copia.findIndex((obr) => obr.id === solicitacao.id);
        copia[indice] = solicitacao;
        this.solicitacoes = copia;
        this.listaSolicitacoesAtualizada.next([...this.solicitacoes]);
      });
  }
}
