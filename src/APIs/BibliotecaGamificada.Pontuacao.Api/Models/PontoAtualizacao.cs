namespace BibliotecaGamificada.Pontuacao.Models
{
    public class PontoAtualizacao
    {
        public string idTurma { get; set; }
        public string idAluno { get; set; }
        public string? idLivroQuiz { get; set; }
        public List<string> livrosLidos { get; set; }
        public double totalPontos { get; set; }
        public string instituicao { get; set; }

        public PontoAtualizacao()
        {
            idTurma = "";
            idAluno = "";
            idLivroQuiz = "";
            this.livrosLidos = new List<string>();
            totalPontos = 0;
            this.instituicao = "";
        }
    }
}