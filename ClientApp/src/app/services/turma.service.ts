import { HttpClient } from "@angular/common/http";
import { Turma } from "../models/entidades/Turma.model";
import { GetModelLista } from "../models/GetModelLista.model";
import { GetModelUnico } from "../models/GetModelUnico.model";

import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class TurmaService {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    }

    public obterTurmasPorIdAluno(id: String){
        let listaTurmas: Array<Turma> = [];

        return new Promise(
            resolve => {
                this.http.get<GetModelLista<Turma>>(this.baseUrl + 'v1/turma/obterTurmasAluno/' + id).subscribe(result => {
                    //TODO: Tratamento erro -> retornar ao front  uma mensagem de erro ao invez de uma turma
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public obterTurmasPorIdProfessor(id: String){
        let listaTurmas: Array<Turma> = [];

        return new Promise(
            resolve => {
                this.http.get<GetModelLista<Turma>>(this.baseUrl + 'v1/turma/obterTurmasProfessor/' + id).subscribe(result => {
                    //TODO: Tratamento erro -> retornar ao front  uma mensagem de erro ao invez de uma turma
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }

    public obterTurmaPorIdTurma(id: String): Turma {
        let turma: Turma;    
        
        this.http.get<GetModelUnico<Turma>>(this.baseUrl + 'v1/turma/obterTurma/' + id).subscribe(result => {
            turma = result.objeto!;
        }, error => console.error(error));

        return turma!;
    }
}