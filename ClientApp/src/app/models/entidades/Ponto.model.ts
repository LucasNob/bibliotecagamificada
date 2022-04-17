import { Aluno } from "./Aluno.model";
import { EntidadeBase } from "./EntidadeBase.model";

export class Ponto extends EntidadeBase{
    turma: String = "";
    aluno!: Aluno;
    livrosLidos: Array<String> = [];
    totalPontos: number = 0;
}