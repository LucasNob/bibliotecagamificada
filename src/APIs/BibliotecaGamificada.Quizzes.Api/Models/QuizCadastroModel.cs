
namespace BibliotecaGamificada.Quizzes.Api.Models
{
    public class QuizCadastroModel
    {
        public string id { get; set; }
        public string pergunta { get; set; }
        public List<string> alternativas { get; set; }
        public int resposta { get; set; }
        public string livro { get; set; }
        public string instituicao { get; set; }
        public QuizCadastroModel(string id, string pergunta, List<string> alternativas, int resposta, string livro, string instituicao)
        {
            this.id = id;
            this.pergunta = pergunta;
            this.alternativas = alternativas;
            this.resposta = resposta;
            this.livro = livro;
            this.instituicao = instituicao;
        }
    }
}