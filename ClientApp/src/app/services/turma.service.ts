import { HttpClient } from "@angular/common/http";
import { Turma } from "../models/entidades/Turma.model";
import { GetModelLista } from "../models/GetModelLista.model";
import { GetModelUnico } from "../models/GetModelUnico.model";

import { Inject, Injectable } from '@angular/core';
import { LoadingOverlayService } from "./loading-overlay.service";

@Injectable({
  providedIn: 'root',
})

export class TurmaService {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,private loading: LoadingOverlayService) {
    }

    public obterTurmasPorIdAluno(id: String) {
        this.loading.show();

        return new Promise(
            resolve => {
                this.http.get<GetModelLista<Turma>>(this.baseUrl + 'v1/turma/obterTurmasAluno/' + id).subscribe(result => {
                    //TODO: Tratamento erro -> retornar ao front  uma mensagem de erro ao invez de uma turma
                    this.loading.hide();
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public obterTurmasPorIdProfessor(id: String) {
        this.loading.show();

        return new Promise(
            resolve => {
                this.http.get<GetModelLista<Turma>>(this.baseUrl + 'v1/turma/obterTurmasProfessor/' + id).subscribe(result => {
                    this.loading.hide();
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }

    public obterTurmasPorIdInstituicao(id: String){
        this.loading.show();

        return new Promise(
            resolve => {
                this.http.get<GetModelLista<Turma>>(this.baseUrl + 'v1/turma/obterTurmasInstituicao/' + id).subscribe(result => {
                    this.loading.hide();
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }

    public obterTurmaPorIdTurma(id: String) {
        return new Promise(
            resolve => {
                this.http.get<GetModelLista<Turma>>(this.baseUrl + 'v1/turma/obterTurma/' + id).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
}