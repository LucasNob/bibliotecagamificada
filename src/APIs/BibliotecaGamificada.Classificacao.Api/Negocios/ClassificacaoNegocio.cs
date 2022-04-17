using BibliotecaGamificada.Comum.Classes.Models;
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

        public async Task<IActionResult> Obter()
        {
            RetornoMsg msg;
            var classificacoes = await classificacaoRepositorio.Obter();
            if (classificacoes == null || classificacoes.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", classificacoes);

            return new OkObjectResult(msg);
        }

        internal async Task<IActionResult> ObterPorTurma(string id)
        {
            RetornoMsg msg;
            var classificacoes = await classificacaoRepositorio.ObterPorTurma(id);
            if (classificacoes == null)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", classificacoes);

            return new OkObjectResult(msg);
        }
    }
}