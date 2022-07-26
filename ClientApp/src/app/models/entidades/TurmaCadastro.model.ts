
export class TurmaCadastroModel{
    id?: string = "";
    nome: string = "";
    anoLetivo: number= 2022;
    instituicao: string = "";
    professor: string = "";
    livros: Array<string>;
    alunos: Array<string>;
    
    constructor(nome: string, anoLetivo: number, instituicao: string, professor: string) {
        this.nome = nome;
        this.anoLetivo = anoLetivo;
        this.instituicao = instituicao;
        this.professor = professor;
        this.livros = [];
        this.alunos = [];
    }
}