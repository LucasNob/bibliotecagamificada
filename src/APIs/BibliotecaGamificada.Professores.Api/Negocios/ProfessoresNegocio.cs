using BibliotecaGamificada.Comum.Classes.Models;
using BibliotecaGamificada.Professores.Comum.Repositorios;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Professores.Negocios
{
    public class ProfessoresNegocio
    {
        private readonly ProfessorRepositorio professorRepositorio;

        public ProfessoresNegocio(ProfessorRepositorio professorRepositorio)
        {
            this.professorRepositorio= professorRepositorio;
        }

        public async Task<IActionResult> Obter()
        {
            RetornoMsg msg;
            var professores = await professorRepositorio.Obter();
            if (professores == null || professores.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", professores);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> ObterProfessorPorId(string id)
        {
            RetornoMsg msg;
            var professores = await professorRepositorio.ObterPorId(id);
            if (professores == null)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", professores);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> ObterProfessorporInstituicao(string id)
        {
            RetornoMsg msg;
            var professores = await professorRepositorio.ObterPorInstituicao(id);
            if (professores == null)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", professores);

            return new OkObjectResult(msg);
        }
    }
}