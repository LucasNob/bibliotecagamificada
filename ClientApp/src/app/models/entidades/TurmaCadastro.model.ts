
export class TurmaCadastroModel{
    id?: String = "";
    nome: String = "";
    anoLetivo: number= 2022;
    instituicao: String = "";
    professor: String = "";
    livros: Array<String>;
    alunos: Array<String>;
    
    constructor(nome: String, anoLetivo: number, instituicao: String, professor: String) {
        this.nome = nome;
        this.anoLetivo = anoLetivo;
        this.instituicao = instituicao;
        this.professor = professor;
        this.livros = [];
        this.alunos = [];
    }
}