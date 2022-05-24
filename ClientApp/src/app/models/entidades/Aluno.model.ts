import { Usuario } from "./Usuario.model";

export class Aluno extends Usuario{
    turma: String = "";
    livrosLidos: Array<String> = [];

    // Aluno(id: String,nome: String,foto: String,livrosLidos: Array<string>,turma: String) {
    //     this.id = id;
    //     this.nome = nome;
    //     this.foto = foto;
    //     this.livrosLidos = new Array<String>();;
    //     this.turma = turma;
    // }
}