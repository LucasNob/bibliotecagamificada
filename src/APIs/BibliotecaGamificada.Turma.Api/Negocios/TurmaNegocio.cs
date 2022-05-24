using BibliotecaGamificada.Comum.Classes.Models;
using BibliotecaGamificada.Pontos.Comum.Entidades;
using BibliotecaGamificada.Pontos.Comum.Repositorios;
using BibliotecaGamificada.Turma.Comum.Entidades;
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

        public async Task<IActionResult> ObterTurmasPorAluno(string id)
        {
            RetornoMsg msg;
            var turmas = await turmaRepositorio.ObterTurmasPorIdAluno(id);

            if (turmas == null || turmas.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", turmas);

            return new OkObjectResult(msg);
        }
        public async Task<IActionResult> ObterTurmasPorProfessor(string id)
        {
            RetornoMsg msg;
            var turmas = await turmaRepositorio.ObterTurmasPorIdProfessor(id);

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
        // internal Task<IActionResult> ObterPorTurma(string turma)
        // {
        //     var turmas;
        // }
    }
}