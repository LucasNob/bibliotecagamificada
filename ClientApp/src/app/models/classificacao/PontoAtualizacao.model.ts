
export class PontoAtualizacao{
    id: String;
    livrosLidos: Array<String>;
    totalPontos: number;

  constructor(id:String, livrosLidos: Array<String>,totalPontos: number) {
      this.id = id;
      this.livrosLidos = livrosLidos;
      this.totalPontos = totalPontos;
  }
    
}
  
  