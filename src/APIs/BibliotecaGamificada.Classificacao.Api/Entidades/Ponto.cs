
using BibliotecaGamificada.Comum.Classes.Entidades;

namespace BibliotecaGamificada.Classificacao.Api.Entidades
{
    public class Ponto : EntidadeRepositorioBase 
    {
        //TODO classe turma
        public string turma { get; set; }
        public string aluno { get; set; }
        public List<string> livrosLidos { get; set; }
        public int totalPontos { get; set; }
        
        public Ponto(string turma, string aluno, List<string> livrosLidos, int totalPontos)
        {
            this.turma = turma;
            this.aluno = aluno;
            this.livrosLidos = livrosLidos;
            this.totalPontos = totalPontos;
        }
    }
}