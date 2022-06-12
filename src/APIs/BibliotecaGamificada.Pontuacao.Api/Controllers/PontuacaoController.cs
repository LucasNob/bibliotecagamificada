using BibliotecaGamificada.Pontuacao.Models;
using BibliotecaGamificada.Pontuacao.Negocios;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Pontuacao.Controllers;

[ApiController]
[Route("/v1/pontuacao")]
public class PontuacaoController : ControllerBase
{
    private readonly ILogger<PontuacaoController> _logger;
    private readonly PontuacaoNegocio pontuacaoNegocio;
    public PontuacaoController(ILogger<PontuacaoController> logger, PontuacaoNegocio pontuacaoNegocio)
    {
        this.pontuacaoNegocio = pontuacaoNegocio;
        _logger = logger;
    }
    [HttpPut, Route("atualizarPontuacaoLivrosLidos")]
    public async Task<IActionResult> AtualizarPontoLivrosLidos([FromBody] PontoAtualizacao livro)
    {
        return await pontuacaoNegocio.AtualizarPontoLivrosLidos(livro);
    }
}
