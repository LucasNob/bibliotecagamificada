import { HttpClient } from "@angular/common/http";
import { Aluno } from "../models/entidades/Aluno.model";
import { GetModelLista } from "../models/GetModelLista.model";

import { Inject, Injectable } from '@angular/core';
import { AlunoCadastroModel } from "../models/entidades/AlunoCadastro.model";

@Injectable({
  providedIn: 'root',
})

export class AlunoService {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    }

    public ObterListaAlunosPorId(listaId:Array<string>){
        return new Promise(
            resolve => {
                this.http.post<GetModelLista<Array<Aluno>>>(this.baseUrl + 'v1/aluno/obterAlunosPorLista/',listaId).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public ObterAlunosPorInstituicao(id:string){
        return new Promise(
            resolve => {
                this.http.get<GetModelLista<Array<Aluno>>>(this.baseUrl + 'v1/aluno/obterPorInstituicao/'+id).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public excluirAluno(id: string){
        return new Promise(
            resolve => {
                this.http.delete<GetModelLista<Aluno>>(this.baseUrl  + 'v1/aluno/excluirAluno/'+id).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public editarAluno(aluno: AlunoCadastroModel) {
        return new Promise(
            resolve => {
                this.http.put<any>(this.baseUrl + 'v1/aluno/editarAluno/', aluno).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public cadastrarAluno(aluno: AlunoCadastroModel) {
        return new Promise(
            resolve => {
                this.http.post<any>(this.baseUrl + 'v1/aluno/cadastrarAluno/', aluno).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
}
  