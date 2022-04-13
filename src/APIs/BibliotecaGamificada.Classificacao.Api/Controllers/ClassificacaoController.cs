using BibliotecaGamificada.Classificacao.Negocios;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Classificacao.Controllers;

[ApiController]
[Route("/v1/classificacao")]
public class ClassificacaoController : ControllerBase
{
    private readonly ILogger<ClassificacaoController> _logger;
    private readonly ClassificacaoNegocio classificacaoNegocio;
    public ClassificacaoController(ILogger<ClassificacaoController> logger, ClassificacaoNegocio classificacaoNegocio)
    {
        this.classificacaoNegocio = classificacaoNegocio;
        _logger = logger;
    }

    [HttpGet, Route("obter")]
    public async Task<IActionResult> ObterClassificacao()
    {
        return await classificacaoNegocio.Obter();
    }
    [HttpGet, Route("obterPorTurma/{id}")]
    public async Task<IActionResult> ObterClassificacaoPorTurma([FromRoute] string id)
    {
        return await classificacaoNegocio.ObterPorTurma(id);
    }
}
