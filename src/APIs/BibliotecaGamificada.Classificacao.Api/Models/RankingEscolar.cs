using BibliotecaGamificada.Instituicoes.Comum.Entidades;
using BibliotecaGamificada.Professores.Comum.Entidades;
using BibliotecaGamificada.Turmas.Comum.Entidades;

namespace BibliotecaGamificada.Classificacao.Api.Models
{
    public class RankingEscolar
    {
        public double quantidadePontos { get; set; }
        public Turma turma { get; set; }
        public Professor professor { get; set; }
        public RankingEscolar(double quantidadePontos, Turma turma, Professor professor)
        {
            this.quantidadePontos = quantidadePontos;
            this.turma = turma;
            this.professor = professor;
        }

    }
}
