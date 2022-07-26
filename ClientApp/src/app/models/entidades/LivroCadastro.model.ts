import { Genero } from "../livro/Genero.model";

export class LivroCadastroModel{
    id?: string = "";
    titulo: string = "";
    autor: string = "";
    capa?: string = "../../../assets/images/default_capa.png";
    genero: Genero;
    instituicao: string = "";
    constructor(titulo: string,autor: string,genero: Genero,instituicao: string,capa?: string) {
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.instituicao = instituicao;
        if(capa!=undefined)
            this.capa = capa;
    }
}