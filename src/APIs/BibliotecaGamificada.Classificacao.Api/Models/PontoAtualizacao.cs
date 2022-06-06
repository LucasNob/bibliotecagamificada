namespace BibliotecaGamificada.Classificacao.Models
{
    public class PontoAtualizacao
    {
        public string idTurma { get; set; }
        public string idAluno { get; set; }
        public List<string> livrosLidos { get; set; }
        public double totalPontos { get; set; }

        public PontoAtualizacao()
        {
            idTurma = "";
            idAluno = "";
            this.livrosLidos = new List<string>();
            totalPontos = 0;
        }
    }
}