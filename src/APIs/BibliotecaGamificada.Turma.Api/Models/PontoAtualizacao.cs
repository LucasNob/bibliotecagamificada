namespace BibliotecaGamificada.Turma.Models
{
    public class PontoAtualizacao
    {
        public string id{ get; set; }
        public List<string> livrosLidos { get; set; }
        public double totalPontos { get; set; }

        public PontoAtualizacao()
        {
            id = "";
            this.livrosLidos = new List<string>();
            totalPontos = 0;
        }
    }
}