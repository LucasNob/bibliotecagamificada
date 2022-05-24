using BibliotecaGamificada.Comum.Classes.Models;
using BibliotecaGamificada.Instituicoes.Comum.Repositorios;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Instituicoes.Negocios
{
    public class InstituicoesNegocio
    {
        private readonly InstituicaoRepositorio instituicaoRepositorio;

        public InstituicoesNegocio(InstituicaoRepositorio instituicaoRepositorio)
        {
            this.instituicaoRepositorio= instituicaoRepositorio;
        }

        public async Task<IActionResult> Obter()
        {
            RetornoMsg msg;
            var instituicoes = await instituicaoRepositorio.Obter();
            if (instituicoes == null || instituicoes.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", instituicoes);

            return new OkObjectResult(msg);
        }

        internal async Task<IActionResult> ObterInstituicaoPorId(string id)
        {
            RetornoMsg msg;
            var instituicoes = await instituicaoRepositorio.ObterPorId(id);
            if (instituicoes == null)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", instituicoes);

            return new OkObjectResult(msg);
        }
    }
}