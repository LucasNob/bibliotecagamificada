import { HttpClient } from "@angular/common/http";
import { GetModelLista } from "../models/GetModelLista.model";

import { Inject, Injectable } from '@angular/core';
import { Professor } from "../models/entidades/Professor.model";
import { ProfessorCadastroModel } from "../models/entidades/ProfessorCadastro.model";

@Injectable({
  providedIn: 'root',
})

export class ProfessorService {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    }

    public ObterProfessoresPorInstituicao(id:string){
        return new Promise(
            resolve => {
                this.http.get<GetModelLista<Array<Professor>>>(this.baseUrl + 'v1/professor/obterPorInstituicao/'+id).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }

    public excluirProfessor(id: string){
        return new Promise(
            resolve => {
                this.http.delete<GetModelLista<Professor>>(this.baseUrl  + 'v1/professor/excluirProfessor/'+id).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }

    public editarProfessor(professor: ProfessorCadastroModel) {
        return new Promise(
            resolve => {
                this.http.put<any>(this.baseUrl + 'v1/professor/editarProfessor/', professor).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }

    public cadastrarProfessor(professor: ProfessorCadastroModel) {
        return new Promise(
            resolve => {
                this.http.post<any>(this.baseUrl + 'v1/professor/cadastrarProfessor/', professor).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
}
