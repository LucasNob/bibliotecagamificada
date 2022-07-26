import { HttpClient } from "@angular/common/http";
import { Aluno } from "../models/entidades/Aluno.model";
import { GetModelLista } from "../models/GetModelLista.model";
import { GetModelUnico } from "../models/GetModelUnico.model";

import { Inject, Injectable } from '@angular/core';
import { Professor } from "../models/entidades/Professor.model";

@Injectable({
  providedIn: 'root',
})

export class ProfessorService {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    }

    public ObterListaProfessoresPorIdInstitucicao(id:string){
        return new Promise(
            resolve => {
                this.http.get<GetModelLista<Array<Professor>>>(this.baseUrl + 'v1/professor/obterPorInstituicao/'+id).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
}
