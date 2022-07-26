import { EntidadeBase } from "./EntidadeBase.model";

export class Turma extends EntidadeBase{
    nome: string = "";
    anoLetivo: number = (new Date()).getFullYear();
    alunos: Array<string> = [];
    livros?: Array<string> = [];
    professor: string = "";
    instituicao: string = "";
}