import { HttpClient } from "@angular/common/http";
import { Parser, Serializer } from "@angular/compiler";
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
        return new Promise(
            resolve => {
                this.http.get<GetModelLista<Livro>>(this.baseUrl + 'v1/livro/obterLivros').subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public obterListaLivros(ids: Array<String>) {
        return new Promise(
            resolve => {
                this.http.post<GetModelLista<Livro>>(this.baseUrl + 'v1/livro/obterLivrosPorLista',ids).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }

    public obterLivroPorId(id:String){
        return new Promise(
            resolve => {
                this.http.get<GetModelUnico<Livro>>(this.baseUrl + 'v1/livro/obterLivro/'+id).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public obterLivrosPorIdInstituicao(id:String){
        let listaLivro: Array<Livro> = [];

        return new Promise(
            resolve => {
                this.http.get<GetModelLista<Livro>>(this.baseUrl + 'v1/livro/obterPorInstituicao/'+id).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public cadastrarLivro(livro: LivroCadastroModel) {
        return new Promise(
            resolve => {
                this.http.post<any>(this.baseUrl + 'v1/livro/cadastrarLivro/', livro).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public editarLivro(livro: LivroCadastroModel) {
        return new Promise(
            resolve => {
                this.http.put<any>(this.baseUrl + 'v1/livro/editarLivro/', livro).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public excluirLivro(id: String){
        return new Promise(
            resolve => {
                this.http.delete<GetModelLista<Livro>>(this.baseUrl + 'v1/livro/excluirLivro/'+id).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
}
  