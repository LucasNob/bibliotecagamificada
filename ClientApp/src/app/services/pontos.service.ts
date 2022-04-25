import { HttpClient } from "@angular/common/http";
import { Ponto } from "../models/entidades/Ponto.model";
import { GetModelLista } from "../models/GetModelLista.model";
import { GetModelUnico } from "../models/GetModelUnico.model";

import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class PontoService {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    }

    // public obterTurmasPorIdUsuario(id: String): Array<Turma> {
    //     let listaTurmas: Array<Turma> = [];
        
    //     this.http.get<GetModelLista<Turma>>(this.baseUrl + 'v1/turma/obterTurmasUsuario/' + id).subscribe(result => {
    //         //TODO: Tratamento erro -> retornar ao front  uma mensagem de erro ao invez de uma turma
    //         listaTurmas = result.objeto;
    //     }, error => console.error(error));
      
    //     return listaTurmas;
    // }
    
    public obterClassificacaoPorIdTurma(id: String){
        let listaPontos: Array<Ponto> = [];

        return new Promise(
            resolve => {
            this.http.get<GetModelLista<Ponto>>(this.baseUrl + 'v1/classificacao/obterPorTurma/' + id).subscribe(result => {
                    //TODO: Tratamento erro -> retornar ao front  uma mensagem de erro ao invez de uma turma
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
}
  