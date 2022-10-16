import { EntidadeBase } from "./EntidadeBase.model";

export class Ponto extends EntidadeBase {
    turma: string = "";
    aluno: string = "";
    livrosLidos: Array<string> = [];
    livrosQuiz: Array<string> = [];
    totalPontos: number = 0;
}