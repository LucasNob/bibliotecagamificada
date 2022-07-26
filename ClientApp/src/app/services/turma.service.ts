import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from '@angular/core';
import { Turma } from "../models/entidades/Turma.model";
import { TurmaCadastroModel } from "../models/entidades/TurmaCadastro.model";
import { GetModelLista } from "../models/GetModelLista.model";
import { LoadingOverlayService } from "./loading-overlay.service";


@Injectable({
  providedIn: 'root',
})

export class TurmaService {

    path = 'v1/turma/';

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private loading: LoadingOverlayService) {
    }
    
    public obterTurmasPorIdAluno(id: string) {
        this.loading.show();
        
        return new Promise(
            resolve => {
                this.http.get<GetModelLista<Turma>>(this.baseUrl + this.path +'obterTurmasAluno/' + id).subscribe(result => {
                    this.loading.hide();
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public obterTurmasPorIdProfessor(id: string) {
        this.loading.show();

        return new Promise(
            resolve => {
                this.http.get<GetModelLista<Turma>>(this.baseUrl + this.path +'obterTurmasProfessor/' + id).subscribe(result => {
                    this.loading.hide();
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
        
    public obterTurmasPorIdInstituicao(id: string){
        this.loading.show();
        
        return new Promise(
            resolve => {
                this.http.get<GetModelLista<Turma>>(this.baseUrl + this.path +'obterTurmasInstituicao/' + id).subscribe(result => {
                    this.loading.hide();
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
            
    public obterTurmaPorIdTurma(id: string) {
        return new Promise(
            resolve => {
                this.http.get<GetModelLista<Turma>>(this.baseUrl + this.path +'obterTurma/' + id).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
        
    public cadastrarTurma(turma: TurmaCadastroModel) {
        return new Promise(
            resolve => {
                this.http.post<any>(this.baseUrl + this.path +'cadastrarTurma/', turma).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public excluirTurma(id: string){
        return new Promise(
            resolve => {
                this.http.delete<GetModelLista<Turma>>(this.baseUrl + this.path + 'excluirTurma/'+id).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public editarTurma(turma: TurmaCadastroModel) {
        return new Promise(
            resolve => {
                this.http.put<any>(this.baseUrl + this.path+ 'editarTurma/', turma).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public atualizarLivrosTurma(turma: TurmaCadastroModel) {
        return new Promise(
            resolve => {
                this.http.put<any>(this.baseUrl + this.path+ 'atualizarLivrosTurma/', turma).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public atualizarAlunosTurma(turma: TurmaCadastroModel) {
        return new Promise(
            resolve => {
                this.http.put<any>(this.baseUrl + this.path+ 'atualizarAlunosTurma/', turma).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public removerAlunoTurma(turma:string,aluno:string) {
        return new Promise(
            resolve => {
                this.http.put<any>(this.baseUrl + this.path+ 'removerAlunoTurma/'+turma+'/'+aluno,null).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public removerLivroTurma(turma:string,livro:string) {
        return new Promise(
            resolve => {
                this.http.put<any>(this.baseUrl + this.path+ 'removerLivroTurma/'+turma+'/'+livro, null).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
}