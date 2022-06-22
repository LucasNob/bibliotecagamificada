
export class PontoAtualizacao{
    idAluno: String;
    idTurma: String;
    livrosLidos: Array<String>;
    totalPontos: number;

  constructor(idAluno:String,idTurma:String, livrosLidos: Array<String>,totalPontos: number,) {
      this.idAluno = idAluno;
      this.idTurma = idTurma;
      this.livrosLidos = livrosLidos;
      this.totalPontos = totalPontos;
  }
    
}
  
  