import { Genero } from "../livro/Genero.model";

export class LivroCadastroModel{
    id?: String = "";
    titulo: String = "";
    autor: String = "";
    capa?: String = "../../../assets/images/default_capa.png";
    genero: Genero;
    instituicao: String = "";
    constructor(titulo: string,autor: string,genero: Genero,instituicao: String,capa?: string) {
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.instituicao = instituicao;
        if(capa!=undefined)
            this.capa = capa;
    }
}