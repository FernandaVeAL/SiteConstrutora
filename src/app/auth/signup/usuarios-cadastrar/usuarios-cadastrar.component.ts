import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios-cadastrar',
  templateUrl: './usuarios-cadastrar.component.html',
  styleUrls: ['./usuarios-cadastrar.component.css'],
})
export class UsuariosCadastrarComponent implements OnInit {
  public tipoUsuario: string;
  public estaCarregando: boolean = false;
  constructor(
    private usuarioService: UsuarioService,
    public route: ActivatedRoute
  ) {}

  onAdicionarUsuario(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.estaCarregando = true;
    const usuario: any = {
      nome: form.value.nome,
      email: form.value.email,
      cpf: form.value.cpf,
      telefone: form.value.telefone,
      senha: form.value.senha,
    };

    this.usuarioService.adicionarUsuario(
      form.value.nome,
      form.value.email,
      form.value.cpf,
      form.value.telefone,
      form.value.senha,
      this.tipoUsuario
    );
    form.reset();
  }
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.tipoUsuario = paramMap.get('tipoUsuario');
    });
  }
}
