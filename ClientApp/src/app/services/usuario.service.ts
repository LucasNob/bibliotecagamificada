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

export class UsuarioService{
  
  // usuario: Usuario = new Usuario("idinstituicao1", "Anglo Sorocaba", 1,"https://pbs.twimg.com/profile_images/570291758630576128/x3lqZT5Z_400x400.png");
  
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private loading: LoadingOverlayService) {
  }
  
  public obterUsuarioPorEmail(email: string) {
      this.loading.show();
      
      return new Promise(
          resolve => {
          this.http.get<GetModelUnico<Usuario>>(this.baseUrl + 'v1/usuario/obterUsuario/'+email).subscribe(result => {
                  this.loading.hide();
                  resolve(result.objeto);
              }, error => console.error(error));
          }
      )
  }
  // novoUsuario(id:string,nome:string,permissao:number,foto?:string) { 
    // this.usuario = new Usuario(id, nome, permissao, foto);
  // }
  // novoUsuario(usuario: Usuario) { 
  //   localStorage.setItem('usuario', JSON.stringify(usuario));
  //   // this.usuario = usuario;
  // }

  // obterUsuario() {
  //   let data = localStorage.getItem('usuario')
  //   if (data)
  //     return JSON.parse(data);
    
  //   return this.usuario;
  // }
  // ObterNivelPermissao() {
  //   return this.usuario.permissao;
  // }
  
  
}