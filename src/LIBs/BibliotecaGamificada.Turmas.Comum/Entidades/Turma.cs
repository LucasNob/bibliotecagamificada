
using BibliotecaGamificada.Comum.Classes.Entidades;

namespace BibliotecaGamificada.Turmas.Comum.Entidades
{
    public class Turma : EntidadeRepositorioBase
    {
        public string nome { get; set; }
        public int anoLetivo { get; set; }
        public string professor { get; set; }
        public string instituicao { get; set; }
        public List<string>? alunos { get; set; }
        public List<string>? livros { get; set; }
        public Turma(string nome, int anoLetivo, string professor, string instituicao, List<string>? alunos, List<string>? livros)
        {
            this.nome = nome;
            this.anoLetivo = anoLetivo;
            this.professor = professor;
            this.instituicao = instituicao;
            this.alunos = alunos;
            this.livros = livros;
        }
        public Turma()
        {
            this.nome = "";
            this.anoLetivo = 0;
            this.professor = "";
            this.instituicao = "";
            this.alunos = new List<string>();
            this.livros = new List<string>();
        }
    }
}