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
    public async Task<IActionResult> ObterTurmas()
    {
        return await turmaNegocio.Obter();
    }
    [HttpGet, Route("obterTurma/{id}")]
    public async Task<IActionResult> ObterTurma([FromRoute]string id)
    {
        return await turmaNegocio.ObterPorId(id);
    }
    [HttpGet, Route("obterTurmasProfessor/{id}")]
    public async Task<IActionResult> ObterTurmasPorProfessor([FromRoute] string id)
    {
        return await turmaNegocio.ObterTurmasPorProfessor(id);
    }
    [HttpGet, Route("obterTurmasAluno/{id}")]
    public async Task<IActionResult> ObterTurmasPorAluno([FromRoute] string id)
    {
        return await turmaNegocio.ObterTurmasPorAluno(id);
    }
}