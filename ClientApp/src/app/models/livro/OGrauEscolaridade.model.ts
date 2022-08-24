export class OGrauEscolaridade
{
    static ObterNome(index:number ): string {
        switch (index) {
            case 0:
                return "Ensino Infantil";
            case 1:
                return "Ensino Fundamental 1";
            case 2:
                return "Ensino Fundamental 2";
            case 3:
                return "Ensino Médio";
            default:
                return "Ensino Infantil"
        }
    }

    static ObterNumero(nome:string ): number {
        switch (nome) {
            case "Ensino Infantil":
                return 0;
            case "Ensino Fundamental 1":
                return 1;
            case "Ensino Fundamental 2":
                return 2;
            case "Ensino Médio":
                return 3;
            default:
                return 0;
        }
    }
}