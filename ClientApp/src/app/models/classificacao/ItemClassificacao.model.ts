import { Ponto } from "../entidades/Ponto.model";

export class ItemClassificacao{
  ponto: Ponto;
  colocacao: number;
  premio?: string;
  img?: string;
  nome: string
    
  constructor(ponto: Ponto, colocacao: number, nome:string, img?:string, premio?: string) {
    this.ponto = ponto;
    this.colocacao = colocacao;
    this.premio = premio;
    this.img = img;
    this.nome = nome;
  }
}
  
  