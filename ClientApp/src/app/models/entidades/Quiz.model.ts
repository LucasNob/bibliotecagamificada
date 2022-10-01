import { EntidadeBase } from "./EntidadeBase.model";

export class Quiz extends EntidadeBase {
    pergunta: string = "";
    alternativa1: string = "";
    alternativa2: string = "";
    alternativa3: string = "";
    alternativa4: string = "";
    alternativas: Array<string> = [];
    resposta: number = 0;
    livro: string = "";
    instituicao: string = "";
}