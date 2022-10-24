import { Genero } from "../livro/Genero.model";
import { EntidadeBase } from "./EntidadeBase.model";

export class Livro extends EntidadeBase {

    titulo: string = "";
    autor: string = "";
    capa?: string = "../../assets/default_capa.png";
    genero?: Genero;
    instituicao?: string = "";
}