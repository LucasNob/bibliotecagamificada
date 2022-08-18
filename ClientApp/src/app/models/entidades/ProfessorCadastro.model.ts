export class ProfessorCadastroModel{
    id: string = '';
    nome: string = '';
    email: string = '';    
    instituicao: string = '';
    telefone: string = '';
    foto?: string = "../../../assets/images/default_avatar.png";
    permissao = 2;
    
    constructor(nome: string, email: string, instituicao: string, telefone: string,foto?: string) {
        this.nome = nome;
        this.email = email;
        this.instituicao = instituicao;
        this.telefone= telefone;
        if(foto)
            this.foto = foto;
    }
}