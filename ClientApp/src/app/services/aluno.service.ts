import { HttpClient } from "@angular/common/http";
import { Aluno } from "../models/entidades/Aluno.model";
import { GetModelLista } from "../models/GetModelLista.model";
import { GetModelUnico } from "../models/GetModelUnico.model";

import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AlunoService {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    }

    public ObterListaAlunosPorId(listaId:Array<String>){
        return new Promise(
            resolve => {
                this.http.post<GetModelLista<Array<Aluno>>>(this.baseUrl + 'v1/aluno/obterAlunosPorLista/',listaId).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
}
  