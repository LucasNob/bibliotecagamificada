using BibliotecaGamificada.Classificacao.Api.Repositorios;
using BibliotecaGamificada.Comum.Classes.Models;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Classificacao.Negocios
{
    public class ClassificacaoNegocio
    {
        private readonly ClassificacaoRepositorio classificacaoRepositorio;

        public ClassificacaoNegocio(ClassificacaoRepositorio classificacaoRepositorio){
            this.classificacaoRepositorio = classificacaoRepositorio;
        }

        public async Task<IActionResult> Obter()
        {
            var classificacoes = await classificacaoRepositorio.Obter();
            var msg = new RetornoMsg("sucesso", "retorno enviado", classificacoes);
            return new OkObjectResult(msg);
        }
    }
}