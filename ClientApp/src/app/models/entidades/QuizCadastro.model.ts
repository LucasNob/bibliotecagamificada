
export class QuizCadastroModel{
    id?: string = "";
    pergunta: string = "";
    alternativas:Array<string> = [];
    resposta:number = 0;
    livro: string = "";;
    instituicao: string = "";;
    
    constructor() {
    }
}