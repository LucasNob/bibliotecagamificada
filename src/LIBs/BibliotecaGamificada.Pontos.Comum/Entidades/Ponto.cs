
using BibliotecaGamificada.Comum.Classes.Entidades;

namespace BibliotecaGamificada.Pontos.Comum.Entidades
{
    public class Ponto : EntidadeRepositorioBase
    {
      
        public string aluno { get; set; }
        public string turma { get; set; }
        public List<string> livrosLidos { get; set; }
        public double totalPontos { get; set; }

        public Ponto(string turma, string aluno, List<string> livrosLidos, double totalPontos)
        {
            this.turma = turma;
            this.aluno = aluno;
            this.livrosLidos = livrosLidos;
            this.totalPontos = totalPontos;
        }
    }
}