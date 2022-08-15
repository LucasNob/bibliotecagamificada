export class AlunoCadastroModel{
    id: string = '';
    nome: string = '';
    email: string = '';    
    instituicao: string = '';
    dataNascimento: Date = new Date();
    foto?: string = "../../../assets/images/default_avatar.png";
    permissao = 3;
    
    constructor(nome: string, email: string, instituicao: string, dataNascimento: Date,foto?: string) {
        this.nome = nome;
        this.email = email;
        this.instituicao = instituicao;
        this.dataNascimento = dataNascimento;
        if(foto)
            this.foto = foto;
    }
}