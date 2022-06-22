import { Ponto } from "../entidades/Ponto.model";

export class ItemClassificacao{
  ponto: Ponto;
  colocacao: number;
  premio?: String;
  img?: String;
  nome: String
    
  constructor(ponto: Ponto, colocacao: number, nome:String, img?:String, premio?: String) {
    this.ponto = ponto;
    this.colocacao = colocacao;
    this.premio = premio;
    this.img = img;
    this.nome = nome;
  }
}
  
  