import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ObraService } from '../obra.service';
@Component({
  selector: 'app-obra-cadastrar',
  templateUrl: './obras-cadastrar.component.html',
  styleUrls: ['./obras-cadastrar.component.css'],
})
export class ObrasCadastrarComponent implements OnInit {
  constructor(private obraService: ObraService) {}

  onAdicionarObra(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const obra: any = {
      inicio: form.value.inicio,
      termino: form.value.termino,
      tipo: form.value.tipo,
      porte: form.value.porte,
      endereco: form.value.endereco,
      numero: form.value.numero,
      bairro: form.value.bairro,
      cidade: form.value.cidade,
      estado: form.value.estado,
      complemento: form.value.complemento,
      cep: form.value.cep,
      aviso: form.value.aviso,
      progresso: form.value.progresso,
      descricao: form.value.descricao,
    };

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
      form.value.descricao
    );
    form.reset();
  }

  ngOnInit(): void {}
}
