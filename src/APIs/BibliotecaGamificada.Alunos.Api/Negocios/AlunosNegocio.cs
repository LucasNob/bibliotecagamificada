using BibliotecaGamificada.Comum.Classes.Models;
using BibliotecaGamificada.Alunos.Comum.Repositorios;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Alunos.Negocios
{
    public class AlunosNegocio
    {
        private readonly AlunoRepositorio alunoRepositorio;

        public AlunosNegocio(AlunoRepositorio alunoRepositorio)
        {
            this.alunoRepositorio= alunoRepositorio;
        }

        public async Task<IActionResult> Obter()
        {
            RetornoMsg msg;
            var alunos = await alunoRepositorio.Obter();
            if (alunos == null || alunos.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", alunos);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> ObterAlunoPorId(string id)
        {
            RetornoMsg msg;
            var alunos = await alunoRepositorio.ObterPorId(id);
            if (alunos == null)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", alunos);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> ObterAlunoporInstituicao(string id)
        {
            RetornoMsg msg;
            var alunos = await alunoRepositorio.ObterPorInstituicao(id);
            if (alunos == null)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", alunos);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> ObterAlunosPorLista(List<string> id)
        {
            RetornoMsg msg;
            var alunos = await alunoRepositorio.ObterPorLista(id);
            if (alunos == null || alunos.Count == 0 )
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", alunos);

            return new OkObjectResult(msg);
        }
      
    }
}