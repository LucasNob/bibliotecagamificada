using BibliotecaGamificada.Instituicoes.Comum.Entidades;

namespace BibliotecaGamificada.Classificacao.Api.Models
{
    public class RankingGlobal{
        public double quantidadePontos {get; set;}
        public Instituicao instituicao {get; set;}

        public RankingGlobal(double quantidadePontos, Instituicao instituicao)
        {
            this.quantidadePontos = quantidadePontos;
            this.instituicao = instituicao;
        }

    }
}
 