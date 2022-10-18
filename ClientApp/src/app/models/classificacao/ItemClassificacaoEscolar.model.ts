export class ItemClassificacaoEscolar {
    // Somente copiei a lógica, verificar se está adequada para o atual cenário
    pontos: number;
    colocacao: number;
    premio?: string;
    img?: string;
    nome: string

    constructor(pontos: number, colocacao: number, nome: string, img?: string, premio?: string) {
        this.pontos = pontos;
        this.colocacao = colocacao;
        this.premio = premio;
        this.img = img;
        this.nome = nome;
    }
}

