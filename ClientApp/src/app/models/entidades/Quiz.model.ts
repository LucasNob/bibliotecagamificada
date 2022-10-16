import { EntidadeBase } from "./EntidadeBase.model";

export class Quiz extends EntidadeBase {
    pergunta: string = "";
    alternativas: Array<string> = [];
    resposta: number = 0;
    livro: string = "";
    instituicao: string = "";
}