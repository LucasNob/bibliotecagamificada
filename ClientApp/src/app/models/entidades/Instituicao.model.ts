import { GrauEscolaridade } from "../livro/GrauEscolaridade.model";
import { Usuario } from "./Usuario.model";

export class Instituicao extends Usuario{
    grauescolaridade: Array<GrauEscolaridade> = [];
    cep: number = 0;
    endereco: string = '';
}