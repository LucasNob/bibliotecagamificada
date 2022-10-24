import { Usuario } from "../models/entidades/Usuario.model";
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Turma } from "../models/entidades/Turma.model";
import { GetModelLista } from "../models/GetModelLista.model";
import { LoadingOverlayService } from "./loading-overlay.service";
import { GetModelUnico } from "../models/GetModelUnico.model";

@Injectable({
  providedIn: 'root',
})

export class UsuarioService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private loading: LoadingOverlayService) {
  }

  public obterUsuarioPorEmail(email: string) {
    this.loading.show();

    return new Promise(
      resolve => {
        this.http.get<GetModelUnico<Usuario>>(this.baseUrl + 'v1/usuario/obterUsuario/' + email).subscribe(result => {
          this.loading.hide();
          resolve(result.objeto);
        }, error => console.error(error));
      }
    )
  }


}