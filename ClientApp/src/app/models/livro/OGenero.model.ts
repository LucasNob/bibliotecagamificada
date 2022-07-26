
export class OGenero
{
    static ObterNome(index:number ): string {
        switch (index) {
            case 0:
                return "Romance";
            case 1:
                return "Crônica";
            case 2:
                return "Conto";
            case 3:
                return "Poesia";
            case 4:
                return "Biografia";
            case 5:
                return "Aventura";
            case 6:
                return "Drama";
            case 7:
                return "HQ";
            case 8:
                return "Terror";
            case 9:
                return "Fantasia";
            case 10:
                return "SciFy";
            case 11:
                return "Didáticos";
            case 12:
                return "Suspense";
            case 13:
                return "LGBTQIA+";
            case 14:
                return "Realismo Mágico";
            case 15:
                return "Juvenil";
            case 16:
                return "Infanto-Juvenil";
            case 17:
                return "Auto-Ajuda";
            case 18:
                return "Humor";
            case 19:
                return "Sem gênero"
            default:
                return "Sem Genero"
        }
    }
    static ObterNumero(nome:string ): number {
        switch (nome) {
            case "Romance":
                return 0;
            case "Crônica":
                return 1;
            case "Conto":
                return 2;
            case "Poesia":
                return 3;
            case "Biografia":
                return 4;
            case "Aventura":
                return 5;
            case "Drama":
                return 6;
            case "HQ":
                return 7;
            case "Terror":
                return 8;
            case "Fantasia":
                return 9;
            case "SciFy":
                return 10;
            case "Didáticos":
                return 11;
            case "Suspense":
                return 12;
            case "LGBTQIA+":
                return 13;
            case "Realismo Mágico":
                return 14;
            case "Juvenil":
                return 15;
            case "Infanto-Juvenil":
                return 16;
            case "Auto-Ajuda":
                return 17;
            case "Humor":
                return 18;
            case "Sem gênero":
                return 19;
            default:
                return 19;
        }
    }
}