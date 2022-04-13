
using BibliotecaGamificada.Comum.Classes.Entidades;
using BibliotecaGamificada.Pontos.Comum.Entidades;

namespace BibliotecaGamificada.Turma.Comum.Entidades
{
    public class Turma : EntidadeRepositorioBase
    {
        public string nome { get; set; }
        public int anoLetivo { get; set; } //TODO: enum ano letivo
        public List<string> alunos { get; set; }
        public List<Ponto> pontos { get; set; }

        public Turma(string turma, int anoLetivo, List<string> alunos, List<Ponto> pontos)
        {
            this.nome = turma;
            this.anoLetivo = anoLetivo;
            this.alunos = alunos;
            this.pontos = pontos;
        }
    }
}