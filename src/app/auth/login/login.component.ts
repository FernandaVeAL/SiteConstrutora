import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private usuarioService: UsuarioService) {}

  onLogin(form: NgForm) {
    if (form.invalid) return;
    this.usuarioService.login(form.value.email, form.value.senha);
  }
}
