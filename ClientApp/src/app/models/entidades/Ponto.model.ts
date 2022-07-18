import { Aluno } from "./Aluno.model";
import { EntidadeBase } from "./EntidadeBase.model";

export class Ponto extends EntidadeBase{
    turma: string = "";
    aluno: string ="";
    livrosLidos: Array<string> = [];
    totalPontos: number = 0;
}