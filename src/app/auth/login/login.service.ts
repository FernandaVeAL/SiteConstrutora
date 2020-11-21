import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  getLogin(email: string, senha: string) {
    return this.httpClient.get<{}>(
      `http://localhost:3000/api/clientes/${email}`
    );
  }
}
