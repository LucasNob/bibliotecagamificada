using BibliotecaGamificada.Turma.Negocios;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Classificacao.Controllers;

[ApiController]
[Route("/v1/turma")]
public class TurmaController : ControllerBase
{
    private readonly ILogger<TurmaController> _logger;
    private readonly TurmaNegocio turmaNegocio;
    public TurmaController(ILogger<TurmaController> logger, TurmaNegocio turmaNegocio)
    {
        this.turmaNegocio = turmaNegocio;
        _logger = logger;
    }

    [HttpGet, Route("obter")]
    public async Task<IActionResult> ObterTurmaso()
    {
        return await turmaNegocio.Obter();
    }
}
