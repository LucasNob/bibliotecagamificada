import { Instituicao } from "../entidades/Instituicao.model";
export class PontoClassificacaoGlobal{
  quantidadePontos: number;
  instituicao: Instituicao;
  premio?: string;
    
  constructor(quantidadePontos: number, instituicao: Instituicao,premio?: string) {
    this.quantidadePontos = quantidadePontos;
    this.instituicao = instituicao;
    this.premio = premio;
  }
}
  
  