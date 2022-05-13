using BibliotecaGamificada.Comum.Classes.Models;
using BibliotecaGamificada.Pontos.Comum.Entidades;
using BibliotecaGamificada.Pontos.Comum.Repositorios;
using BibliotecaGamificada.Turma.Comum.Entidades;
using BibliotecaGamificada.Turma.Models;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Turma.Negocios
{
    public class TurmaNegocio
    {
        private readonly TurmaRepositorio turmaRepositorio;
        private readonly PontoRepositorio pontoRepositorio;

        public TurmaNegocio(TurmaRepositorio turmaRepositorio,PontoRepositorio pontoRepositorio)
        {
            this.turmaRepositorio = turmaRepositorio;
            this.pontoRepositorio = pontoRepositorio;
        }

        public async Task<IActionResult> Obter()
        {
            RetornoMsg msg;
            var turmas = await turmaRepositorio.Obter();
            if (turmas == null || turmas.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", turmas);

            return new OkObjectResult(msg);
        }

        internal Task<IActionResult> ObterPorId()
        {
            throw new NotImplementedException();
        }

        public async Task<IActionResult> ObterTurmasPorUsuario(string id)
        {
            RetornoMsg msg;
            var turmas = await turmaRepositorio.ObterTurmasPorIdUsuario(id);

            if (turmas == null || turmas.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", turmas);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> ObterPorId(string id)
        {
            RetornoMsg msg;
            var turma = await turmaRepositorio.ObterTurmaPorId(id);
            if (turma == null)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", turma);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> AdicionarLivroLido(PontoAtualizacao atualizacao)
        {
            try
            {
                var ponto = await pontoRepositorio.ObterPorId(atualizacao.id);
                var ponto2 = new Ponto();

                ponto2.livrosLidos = ponto.livrosLidos;
                ponto2.livrosLidos.Concat(atualizacao.livrosLidos);
                ponto2.totalPontos = ponto.totalPontos += atualizacao.livrosLidos.Count;

                await pontoRepositorio.Atualizar(ponto,ponto2);
            }
            catch(Exception e){
                return new OkObjectResult(new RetornoMsg("erro", "Registros não encontrados",e));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Livros Livros Atualizados"));
        }

        // internal Task<IActionResult> ObterPorTurma(string turma)
        // {
        //     var turmas;
        // }
    }
}