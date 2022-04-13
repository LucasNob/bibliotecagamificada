// import { HttpClient } from "@angular/common/http";
// import { GetModel } from "../models/GetModel.model";
// import { Ponto } from "../models/Ponto.model";

// export class PontosService {
    
//     http?: HttpClient;
//     baseUrl?: string;
    
//     constructor(http: HttpClient, baseUrl: string) {
//         this.http = http;
//         this.baseUrl = baseUrl;
//     }
    
//     public obterPontos(turma: string): any {
//         this.http?.get<GetModel<Ponto>>(this.baseUrl + 'v1/classificacao/obter').subscribe(result => {
//             console.log(result);
//             return result;
//         }, error => console.error(error));
//     }
//     obterPontosPorTurma(id: string): any {
//         this.http?.get<GetModel<Ponto>>(this.baseUrl + 'v1/classificacao/obterporturma/'+id).subscribe(result => {
//             console.log(result);
//             return result;
//         }, error => console.error(error));
//     } 
// }
