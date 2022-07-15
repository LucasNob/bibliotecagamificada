import { EntidadeBase } from "./EntidadeBase.model";

export class Turma extends EntidadeBase{
    nome: String = "";
    anoLetivo: number = (new Date()).getFullYear();
    alunos: Array<String> = [];
    livros?: Array<String> = [];
    professor: String = "";
    instituicao: String = "";
}