import { Professor } from "../entidades/Professor.model";
import { Turma } from "../entidades/Turma.model";

export class PontoClassificacaoEscolar {
    quantidadePontos: number;
    turma: Turma;
    professor: Professor;
    premio?: string;

    constructor(quantidadePontos: number, turma: Turma, professor: Professor, premio?: string) {
        this.quantidadePontos = quantidadePontos;
        this.turma = turma;
        this.professor = professor;
        this.premio = premio;
    }
}

