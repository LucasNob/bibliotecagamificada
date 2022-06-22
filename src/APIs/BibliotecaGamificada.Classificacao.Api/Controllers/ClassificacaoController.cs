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
    public async Task<IActionResult> ObterPontos()
    {
        return await classificacaoNegocio.ObterPontos();
    }
    [HttpGet, Route("obterPorTurma/{id}")]
    public async Task<IActionResult> ObterPontosPorTurma([FromRoute] string id)
    {
        return await classificacaoNegocio.ObterPontosPorTurma(id);
    }
    [HttpGet, Route("obterPontoAluno/{idTurma}/{idAluno}")]
    public async Task<IActionResult> ObterPontosPorAluno([FromRoute] string idTurma,[FromRoute] string idAluno)
    {
        return await classificacaoNegocio.ObterPontosPorAluno(idTurma,idAluno);
    }
}
