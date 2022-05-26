using BibliotecaGamificada.Classificacao.Models;
using BibliotecaGamificada.Comum.Classes.Models;
using BibliotecaGamificada.Pontos.Comum.Entidades;
using BibliotecaGamificada.Pontos.Comum.Repositorios;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Classificacao.Negocios
{
    public class ClassificacaoNegocio
    {
        private readonly PontoRepositorio classificacaoRepositorio;

        public ClassificacaoNegocio(PontoRepositorio classificacaoRepositorio)
        {
            this.classificacaoRepositorio = classificacaoRepositorio;
        }

        public async Task<IActionResult> ObterPontos()
        {
            RetornoMsg msg;
            var classificacoes = await classificacaoRepositorio.Obter();
            if (classificacoes == null || classificacoes.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", classificacoes);

            return new OkObjectResult(msg);
        }

        internal async Task<IActionResult> ObterPontosPorTurma(string id)
        {
            RetornoMsg msg;
            var classificacoes = await classificacaoRepositorio.ObterPorTurma(id);
            if (classificacoes == null)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", classificacoes);

            return new OkObjectResult(msg);
        }
        public async Task<IActionResult> AtualizarPontoLivrosLidos(PontoAtualizacao atualizacao)
        {
            try
            {
                var ponto = await classificacaoRepositorio.ObterPorId(atualizacao.id);
                if (ponto == null)
                    throw new Exception("Registro não encontrado");
                var ponto2 = new Ponto();

                ponto2.livrosLidos = atualizacao.livrosLidos;
                ponto2.totalPontos += ponto.totalPontos + atualizacao.livrosLidos.Count - ponto.livrosLidos.Count;

                await classificacaoRepositorio.AtualizarPontoLivrosLidos(ponto, ponto2);
            }
            catch (Exception e)
            {
                return new OkObjectResult(new RetornoMsg("erro", "Registros não encontrados", e));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Livros Atualizados"));
        }
    }
}