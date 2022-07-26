import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from '@angular/core';
import { PontoAtualizacao } from "../models/classificacao/PontoAtualizacao.model";
import { Ponto } from "../models/entidades/Ponto.model";
import { GetModelLista } from "../models/GetModelLista.model";


@Injectable({
  providedIn: 'root',
})

export class PontoService {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    }

    public obterClassificacaoPorIdTurma(id: string){
        let listaPontos: Array<Ponto> = [];

        return new Promise(
            resolve => {
                this.http.get<GetModelLista<Ponto>>(this.baseUrl + 'v1/classificacao/obterPorTurma/' + id).subscribe(result => {
                    //TODO: Tratamento erro -> retornar ao front  uma mensagem de erro ao invez de uma turma
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        );
    }

    public atualizarPontuacao(atualizacao:PontoAtualizacao) {
        return new Promise(
            resolve => {
                this.http.put<any>(this.baseUrl + 'v1/pontuacao/atualizarPontuacaoLivrosLidos/', atualizacao).subscribe(result => {
                    //TODO: Tratamento erro -> retornar ao front  uma mensagem de erro ao invez de uma turma
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public obterPontoAluno(idTurma:string,idAluno:string) {
        return new Promise(
            resolve => {
                this.http.get<any>(this.baseUrl + 'v1/classificacao/obterPontoAluno/'+idTurma+'/'+idAluno).subscribe(result => {
                    //TODO: Tratamento erro -> retornar ao front  uma mensagem de erro ao invez de uma turma
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
}