import { Usuario } from "./Usuario.model";

export class Aluno extends Usuario{
    turma: String = "";
    totalLivrosLidos: number = 0;

    Aluno(
        id: String,
        nome: String,
        foto: String,
        totalLivrosLidos: number,
        turma: String) {
        this.id = id;
        this.nome = nome;
        this.foto = foto;
        this.totalLivrosLidos = totalLivrosLidos;
        this.turma = turma;
    }
}