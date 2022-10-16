using BibliotecaGamificada.Comum.Classes.Entidades;

namespace BibliotecaGamificada.Quizzes.Comum.Entidades
{
    public class Quiz : EntidadeRepositorioBase
    {
        public string pergunta { get; set; }
        public List<string> alternativas { get; set; }
        public int resposta { get; set; }
        public string livro { get; set; }
        public string instituicao { get; set; }

        public Quiz(string pergunta, List<string> alternativas, int resposta, string livro, string instituicao)
        {
            this.pergunta = pergunta;
            this.alternativas = alternativas;
            this.resposta = resposta;
            this.livro = livro;
            this.instituicao = instituicao;
        }
    }
}