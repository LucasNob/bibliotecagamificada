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
}
