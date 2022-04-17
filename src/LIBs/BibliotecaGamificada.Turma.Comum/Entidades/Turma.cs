
using BibliotecaGamificada.Comum.Classes.Entidades;
using BibliotecaGamificada.Pontos.Comum.Entidades;

namespace BibliotecaGamificada.Turma.Comum.Entidades
{
    public class Turma : EntidadeRepositorioBase
    {
        public string nome { get; set; }
        public int anoLetivo { get; set; } //TODO: enum ano letivo
        public string aluno { get; set; }
        
        public Turma(string turma, int anoLetivo, string alunos)
        {
            this.nome = turma;
            this.anoLetivo = anoLetivo;
            this.aluno = alunos;
        }
    }
}