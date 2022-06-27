using BibliotecaGamificada.Professores.Negocios;
using Microsoft.AspNetCore.Mvc;
namespace BibliotecaGamificada.Professores.Controllers;

[ApiController]
[Route("/v1/professor")]
public class ProfessoresController : ControllerBase
{
    private readonly ILogger<ProfessoresController> _logger;
    private readonly ProfessoresNegocio professoresNegocio;
    public ProfessoresController(ILogger<ProfessoresController> logger, ProfessoresNegocio professoresNegocio)
    {
        this.professoresNegocio = professoresNegocio;
        _logger = logger;
    }

    [HttpGet, Route("obter")]
    public async Task<IActionResult> Obter()
    {
        return await professoresNegocio.Obter();
    }
    [HttpGet, Route("obterProfessor/{id}")]
    public async Task<IActionResult> ObterProfessorPorId([FromRoute] string id)
    {
        return await professoresNegocio.ObterProfessorPorId(id);
    }
}
