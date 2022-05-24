import { Usuario } from "../models/entidades/Usuario.model";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class UsuarioService{
  
  usuario: Usuario = new Usuario("idaluno1", "Lucas Vinicius", 3);
  
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