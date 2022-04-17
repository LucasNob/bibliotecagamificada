// import { HttpClient } from "@angular/common/http";
// import { GetModel } from "../models/GetModel.model";
// import { Turma } from "../models/Turma.model";

// export class TurmaService { 

//     http?: HttpClient;
//     baseUrl?: string;
//     retorno?: GetModel<Turma>;

//     constructor(http: HttpClient, baseUrl: string) {
//         this.http = http;
//         this.baseUrl = baseUrl;
//     }

//     public obterTurmas(): GetModel<Turma> {
        
//         this.http?.get<GetModel<Turma>>(this.baseUrl + 'v1/turma/obter').subscribe(result => {
//             console.log(result);
//             this.retorno = result;
//         }, error => console.error(error));
        
//         return this.retorno!;
//     }
// }
  