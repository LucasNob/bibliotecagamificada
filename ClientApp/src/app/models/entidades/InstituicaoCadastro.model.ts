import { GrauEscolaridade } from "../livro/GrauEscolaridade.model";

export class InstituicaoCadastroModel{
    id: string = '';
    nome: string = '';
    email: string = '';
    grauescolaridade: Array<GrauEscolaridade> = [];
    cep: number = 0;
    endereco: string = '';    
    foto?: string = "../../../assets/images/default_avatar.png";
    permissao = 1;

    constructor(nome: string, email: string, grauescolaridade: Array<GrauEscolaridade>,cep: number,endereco: string, foto?: string) {
        this.nome = nome;
        this.email = email;
        this.grauescolaridade = grauescolaridade;
        this.cep = cep;
        this.endereco = endereco;
        if(foto)
            this.foto = foto;
    }
}