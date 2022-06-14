import { Usuario } from "../models/entidades/Usuario.model";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class UsuarioService{
  
  usuario: Usuario = new Usuario("idinstituicao1", "Anglo Sorocaba",1,
  "https://pbs.twimg.com/profile_images/570291758630576128/x3lqZT5Z_400x400.png");
  
  constructor() {
  }
  novoUsuario(id:String,nome:String,permissao:number,foto?:String) { 
    this.usuario = new Usuario(id, nome, permissao, foto);
  }

  obterUsuario() {
    return this.usuario;
  }
  ObterNivelPermissao() {
    return this.usuario.permissao;
  }
}