import { Usuario } from "./Usuario.model";

export class Aluno extends Usuario{
    instituicao: string = "";
    dataNascimento: number = Date.now();
}