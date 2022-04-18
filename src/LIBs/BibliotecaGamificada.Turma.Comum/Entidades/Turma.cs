
using BibliotecaGamificada.Comum.Classes.Entidades;
using BibliotecaGamificada.Pontos.Comum.Entidades;

namespace BibliotecaGamificada.Turma.Comum.Entidades
{
    public class Turma : EntidadeRepositorioBase
    {
        public string nome { get; set; }
        public int anoLetivo { get; set; }
        public string professor { get; set; }
        public List<string> alunos { get; set; }
        public List<string> livros { get; set; }
        
        public Turma(string turma, int anoLetivo, string professor, List<string> alunos, List<string> livros)
        {
            this.nome = turma;
            this.anoLetivo = anoLetivo;
            this.professor = professor;
            this.alunos = alunos;
            this.livros = livros;
        }
    }
}