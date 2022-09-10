using BibliotecaGamificada.Instituicoes.Comum.Entidades;

namespace BibliotecaGamificada.Classificacao.Api.Models
{
    public class RankingGlobal{
        public int quantidadePontos {get; set;}
        public Instituicao instituicao {get; set;}

        public RankingGlobal(int quantidadePontos, Instituicao instituicao)
        {
            this.quantidadePontos = quantidadePontos;
            this.instituicao = instituicao;
        }

    }
}
 