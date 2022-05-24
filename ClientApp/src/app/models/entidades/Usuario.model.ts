export class Usuario{
    id: String = "";
    nome: String = "";
    foto: String = "../../assets/images/default_avatar.png";
    permissao: number = 3; //TODO criar enum
    constructor(id: String, nome:String, permissao: number, foto?: String) {
        this.id = id;
        this.nome = nome;
        this.permissao = permissao
        if (foto != undefined)
            this.foto = foto;
    }
}