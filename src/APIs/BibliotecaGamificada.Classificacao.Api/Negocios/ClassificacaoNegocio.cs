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
        public async Task<IActionResult> ObterPontosPorAluno(string idTurma, string idAluno)
        {
            RetornoMsg msg;
            var pontos = await classificacaoRepositorio.ObterPorAluno(idAluno);
            var ponto = pontos.Find(p => p.turma == idTurma);
            
            if (ponto == null)
                msg = new RetornoMsg("erro", "Registro não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", ponto);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> ObterPontosPorTurma(string id)
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