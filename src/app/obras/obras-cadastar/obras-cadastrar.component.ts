import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ObraService } from '../obra.service';
import { UsuarioService } from '../../auth/usuario.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-obra-cadastrar',
  templateUrl: './obras-cadastrar.component.html',
  styleUrls: ['./obras-cadastrar.component.css'],
})
export class ObrasCadastrarComponent implements OnInit {
  constructor(
    private obraService: ObraService,
    private usuarioService: UsuarioService
  ) {}
  public estaCarregando: boolean = false;
  public usuarios = [];
  public usuarioSelecionado;
  onAdicionarObra(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // const obra: any = {
    //   inicio: form.value.inicio,
    //   termino: form.value.termino,
    //   tipo: form.value.tipo,
    //   porte: form.value.porte,
    //   endereco: form.value.endereco,
    //   numero: form.value.numero,
    //   bairro: form.value.bairro,
    //   cidade: form.value.cidade,
    //   estado: form.value.estado,
    //   complemento: form.value.complemento,
    //   cep: form.value.cep,
    //   aviso: form.value.aviso,
    //   progresso: form.value.progresso,
    //   descricao: form.value.descricao,
    //   idCliente: this.usuarioSelecionado
    // };
    this.estaCarregando = true;
    this.obraService.adicionarObra(
      form.value.inicio,
      form.value.termino,
      form.value.tipo,
      form.value.porte,
      form.value.endereco,
      form.value.numero,
      form.value.bairro,
      form.value.cidade,
      form.value.estado,
      form.value.complemento,
      form.value.cep,
      form.value.aviso,
      form.value.progresso,
      form.value.descricao,
      this.usuarioSelecionado
    );
    form.reset();
  }

  ngOnInit(): void {
    this.usuarioService
      .getListaDeUsuariosAtualizadaObservable()
      .subscribe((dados: { usuarios: []; maxUsuarios: number }) => {
        this.usuarios = dados.usuarios;
        console.log(this.usuarios);
      });
    this.usuarioService.getListaUsuarios();
  }
}
