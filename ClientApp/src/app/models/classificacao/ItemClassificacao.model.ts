import { Ponto } from "../entidades/Ponto.model";

export class ItemClassificacao{
    ponto: Ponto;
    premio?: string;
    colocacao: number;
    
    constructor(ponto: Ponto, colocacao: number, premio?: string) {
      this.ponto = ponto;
      this.colocacao = colocacao;
      this.premio = premio;
    }
  }
  
  