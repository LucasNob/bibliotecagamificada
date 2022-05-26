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

        public async Task<IActionResult> ObterTurmas()
        {
            RetornoMsg msg;
            var turmas = await turmaRepositorio.Obter();
            if (turmas == null || turmas.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", turmas);

            return new OkObjectResult(msg);
        }
        public async Task<IActionResult> ObterTurmasPorAluno(string id)
        {
            RetornoMsg msg;
            var turmas = await turmaRepositorio.ObterPorAluno(id);

            if (turmas == null || turmas.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", turmas);

            return new OkObjectResult(msg);
        }
        public async Task<IActionResult> ObterTurmasPorProfessor(string id)
        {
            RetornoMsg msg;
            var turmas = await turmaRepositorio.ObterPorProfessor(id);

            if (turmas == null || turmas.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", turmas);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> ObterTurmaPorId(string id)
        {
            RetornoMsg msg;
            var turma = await turmaRepositorio.ObterPorId(id);
            if (turma == null)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", turma);

            return new OkObjectResult(msg);
        }
    }
}