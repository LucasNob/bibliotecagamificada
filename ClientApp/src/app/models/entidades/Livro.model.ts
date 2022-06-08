import { Genero } from "../livro/Genero.model";
import { EntidadeBase } from "./EntidadeBase.model";

// export class Livro extends EntidadeBase{
    export class Livro extends EntidadeBase{
    
    titulo: String = "";
    autor: String = "";
    capa?: String = "../../assets/default_capa.png";
    genero?: Genero;
    instituicao?: String = ""; 
}