import { Aluno } from "./Aluno.model";
import { EntidadeBase } from "./EntidadeBase.model";

export class Livro extends EntidadeBase{
    titulo: String = "";
    autor: String = "";
    capa?: String = "../../assets/default_capa.png";
    genero?: String;
    instituicao: String = ""; 
    
    // constructor(titulo: String, autor: String, genero: String, capa?: String) {
    //     super();
    //     this.titulo = titulo;
    //     this.autor = autor;
    //     this.genero = genero;
    //     if (capa != undefined)
    //         this.capa = capa;
    // }
}