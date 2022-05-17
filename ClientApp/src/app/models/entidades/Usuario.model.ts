export class Usuario{
    id: String = "";
    nome: String = "";
    foto: String = "../../assets/images/default_avatar.png";
    //permissao: enum;
    constructor(id: String, nome:String, foto?: String) {
        this.id = id;
        this.nome = nome;
        if (foto != undefined)
            this.foto = foto;
    }
}