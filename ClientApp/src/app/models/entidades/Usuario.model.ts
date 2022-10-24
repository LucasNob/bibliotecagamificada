export class Usuario {
    id: string = "";
    nome: string = "";
    foto: string = "../../assets/images/default_avatar.png";
    permissao: number = 3;
    email: string = "";
    constructor(id: string, nome: string, permissao: number, foto?: string) {
        this.id = id;
        this.nome = nome;
        this.permissao = permissao;
        if (foto != undefined)
            this.foto = foto;
    }
}