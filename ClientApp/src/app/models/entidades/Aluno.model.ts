import { Usuario } from "./Usuario.model";

export class Aluno extends Usuario{
    instituicao: String = "";
    dataNascimento: number = Date.now();
}