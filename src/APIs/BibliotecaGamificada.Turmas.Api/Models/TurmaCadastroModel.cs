
namespace BibliotecaGamificada.Turmas.Api.Models
{
    public class TurmaCadastroModel
    {
        public string? id { get; set; }
        public string nome { get; set; }
        public int anoLetivo { get; set; }
        public string professor { get; set; }
        public List<string>? alunos { get; set; }
        public List<string>? livros { get; set; }
        public string instituicao { get; set; }

        public TurmaCadastroModel(string nome, int anoLetivo,string professor, List<string> alunos, List<string> livros, string instituicao)
        {
            this.nome = nome;
            this.anoLetivo = anoLetivo;
            this.professor = professor;
            this.alunos = alunos;
            this.livros = livros;
            this.instituicao = instituicao;
        }
    }
}