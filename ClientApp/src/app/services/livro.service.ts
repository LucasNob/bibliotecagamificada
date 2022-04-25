import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from '@angular/core';
import { Livro } from "../models/entidades/Livro.model";
import { LivroCadastroModel } from "../models/entidades/LivroCadastro.model";
import { GetModelLista } from "../models/GetModelLista.model";
import { GetModelUnico } from "../models/GetModelUnico.model";


@Injectable({
  providedIn: 'root',
})

export class LivroService {
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
    
    public obterLivros(){
        let listaLivro: Array<Livro> = [];

        return new Promise(
            resolve => {
                this.http.get<GetModelLista<Livro>>(this.baseUrl + 'v1/livro/obterLivros').subscribe(result => {
                    //TODO: Tratamento erro -> retornar ao front  uma mensagem de erro ao invez de uma turma
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public obterLivroPorId(id:string){
        let listaLivro: Array<Livro> = [];

        return new Promise(
            resolve => {
                this.http.get<GetModelUnico<Livro>>(this.baseUrl + 'v1/livro/obterLivro/'+id).subscribe(result => {
                    //TODO: Tratamento erro -> retornar ao front  uma mensagem de erro ao invez de uma turma
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public cadastrarLivro(livro: LivroCadastroModel) {
        let headers = { 'Content-Type': 'application/json'} 
        // let body = JSON.stringify(livro);
        return new Promise(
            resolve => {
                this.http.post<any>(this.baseUrl + 'v1/livro/cadastrarLivro/', livro, { 'headers': headers }).subscribe(result => {
                    //TODO: Tratamento erro -> retornar ao front  uma mensagem de erro ao invez de uma turma
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }

    // public obterTurmaPorIdTurma(id: String): Turma {
    //     let turma: Turma;    
        
    //     this.http.get<GetModelUnico<Turma>>(this.baseUrl + 'v1/turma/obterTurma/' + id).subscribe(result => {
    //         turma = result.objeto!;
    //     }, error => console.error(error));

    //     return turma!;
    // }
}
  