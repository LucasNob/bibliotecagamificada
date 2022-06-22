
using BibliotecaGamificada.Comum.Classes.Entidades;

namespace BibliotecaGamificada.Pontos.Comum.Entidades
{
    public class Ponto : EntidadeRepositorioBase
    {
        public string aluno { get; set; }
        public string turma { get; set; }
        public List<string> livrosLidos { get; set; }
        public double totalPontos { get; set; }

        public Ponto(string aluno, string turma, List<string> livrosLidos, double totalPontos)
        {
            this.aluno = aluno;
            this.turma = turma;
            this.livrosLidos = livrosLidos;
            this.totalPontos = totalPontos;
        }
        public Ponto() {
            this.aluno = "";
            this.turma = "";
            this.livrosLidos = new List<string>();
            this.totalPontos = 0;
        }
    }
}