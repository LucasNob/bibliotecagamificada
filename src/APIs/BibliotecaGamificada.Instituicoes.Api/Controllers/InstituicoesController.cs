using BibliotecaGamificada.Instituicoes.Api.Models;
using BibliotecaGamificada.Instituicoes.Negocios;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Instituicoes.Controllers;

[ApiController]
[Route("/v1/instituicao")]
public class InstituicoesController : ControllerBase
{
    private readonly ILogger<InstituicoesController> _logger;
    private readonly InstituicoesNegocio instituicoesNegocio;
    public InstituicoesController(ILogger<InstituicoesController> logger, InstituicoesNegocio instituicoesNegocio)
    {
        this.instituicoesNegocio = instituicoesNegocio;
        _logger = logger;
    }

    [HttpGet, Route("obter")]
    public async Task<IActionResult> Obter()
    {
        return await instituicoesNegocio.Obter();
    }
    [HttpGet, Route("obterInstituicao/{id}")]
    public async Task<IActionResult> ObterInstituicaoPorId([FromRoute] string id)
    {
        return await instituicoesNegocio.ObterInstituicaoPorId(id);
    }
    [HttpPost, Route("cadastrarInstituicao")]
    public async Task<IActionResult> CadastrarInstituicao([FromBody] InstituicaoCadastroModel instituicao)
    {
        return await instituicoesNegocio.CadastrarInstituicao(instituicao);
    }

    [HttpPut, Route("editarInstituicao")]
    public async Task<IActionResult> EditarInstituicao([FromBody] InstituicaoCadastroModel instituicao)
    {
        return await instituicoesNegocio.EditarInstituicao(instituicao);
    }

    [HttpDelete, Route("excluirInstituicao/{id}")]
    public async Task<IActionResult> ExcluirInstituicao([FromRoute] string id)
    {
        return await instituicoesNegocio.ExcluirInstituicao(id);
    }
}
