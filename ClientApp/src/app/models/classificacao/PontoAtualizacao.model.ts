
export class PontoAtualizacao{
    idAluno: string;
    idTurma: string;
    livrosLidos: Array<string>;
    totalPontos: number;

  constructor(idAluno:string,idTurma:string, livrosLidos: Array<string>,totalPontos: number,) {
      this.idAluno = idAluno;
      this.idTurma = idTurma;
      this.livrosLidos = livrosLidos;
      this.totalPontos = totalPontos;
  }
    
}
  
  