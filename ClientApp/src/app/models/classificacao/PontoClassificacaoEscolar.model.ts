import { Professor } from "../entidades/Professor.model";
import { Turma } from "../entidades/Turma.model";

export class PontoClassificacaoEscolar {
    // Somente copiei a lógica e adicionei as Classes Turma e Professor, verificar se está adequada para o atual cenário
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

