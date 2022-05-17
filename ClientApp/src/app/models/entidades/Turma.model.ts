import { EntidadeBase } from "./EntidadeBase.model";

export class Turma extends EntidadeBase{
    nome: String = "";
    anoLetivo: number = 0;
    alunos: Array<String> = [];
    // livros?: Array<String> = [];
    // professor: String = "";
}