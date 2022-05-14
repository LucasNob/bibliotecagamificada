import { Usuario } from "../models/entidades/Usuario.model";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class UsuarioService{
    usuario = new Usuario("idaluno1","Lucas Vinicius");
    constructor() {
        
    }
    obterUsuario() {
        return this.usuario;
    }
}