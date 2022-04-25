import { EntidadeBase } from "./EntidadeBase.model";

export class LivroCadastroModel extends EntidadeBase {
    titulo: String = "";
    autor: String = "";
    capa?: String = "../../assets/default_capa.png";
    genero?: number = 0;
    instituicao: String = "";
}