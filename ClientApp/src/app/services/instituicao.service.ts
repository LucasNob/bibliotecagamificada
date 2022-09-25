import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Instituicao } from "../models/entidades/Instituicao.model";
import { InstituicaoCadastroModel } from "../models/entidades/InstituicaoCadastro.model";
import { GetModelLista } from "../models/GetModelLista.model";
import { GetModelUnico } from "../models/GetModelUnico.model";

@Injectable({
    providedIn: 'root',
  })

  export class InstituicaoService {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    }

    public obterInstituicaoPorId(id:string){
        return new Promise(
            resolve => {
                this.http.get<GetModelUnico<Instituicao>>(this.baseUrl + 'v1/instituicao/obterInstituicao/'+id).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }

    public excluirInstituicao(id: string){
        return new Promise(
            resolve => {
                this.http.delete<GetModelLista<Instituicao>>(this.baseUrl  + 'v1/instituicao/excluirInstituicao/'+id).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }

    public editarInstituicao(instituicao: InstituicaoCadastroModel) {
        return new Promise(
            resolve => {
                this.http.put<any>(this.baseUrl + 'v1/instituicao/editarInstituicao/', instituicao).subscribe(result => {
                    if (result.status == 'erro') {
                        window.alert(result.mensagem)
                        throw new Error(result.mensagem);
                    }
                    else {
                        resolve(true);
                    }
                }, error => console.error(error));
            }
        )
    }

    public cadastrarInstituicao(instituicao: InstituicaoCadastroModel) {
        return new Promise(
            resolve => {
                this.http.post<any>(this.baseUrl + 'v1/instituicao/cadastrarInstituicao/', instituicao).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }

  }