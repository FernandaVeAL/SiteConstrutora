import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { SolicitacaoService } from './solicitacao.service';
import { UsuarioService } from '../auth/usuario.service';
import { mimeTypeValidator } from '../validadores/mime-type.validator';

@Component({
  selector: 'app-solicitacao-obras',
  templateUrl: './solicitacao-obras.component.html',
  styleUrls: ['./solicitacao-obras.component.css'],
})
export class SolicitacaoObrasComponent implements OnInit {
  constructor(
    public solicitacaoService: SolicitacaoService,
    public usuarioService: UsuarioService
  ) {}
  form: FormGroup;
  public idUsuario: string;
  public previewImagem: string;
  ngOnInit(): void {
    this.idUsuario = this.usuarioService.getIdUsuario();
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
      imagem: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeTypeValidator],
      }),
    });
  }

  onAdicionarSolicitacao() {
    this.solicitacaoService.adicionarSolicitacao(
      this.form.value.tipo,
      this.form.value.porte,
      this.form.value.endereco,
      this.form.value.numero,
      this.form.value.bairro,
      this.form.value.cidade,
      this.form.value.estado,
      this.form.value.complemento,
      this.form.value.cep,
      this.idUsuario,
      this.form.value.imagem
    );
  }
  onImagemSelecionada(event: Event) {
    const arquivo = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ imagem: arquivo });
    this.form.get('imagem').updateValueAndValidity();
    console.log(arquivo);
    console.log(this.form);
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImagem = reader.result as string;
    };
    reader.readAsDataURL(arquivo);
  }
}
