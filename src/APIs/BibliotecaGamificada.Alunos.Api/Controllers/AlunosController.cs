using BibliotecaGamificada.Alunos.Negocios;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Alunos.Controllers;

[ApiController]
[Route("/v1/aluno")]
public class AlunosController : ControllerBase
{
    private readonly ILogger<AlunosController> _logger;
    private readonly AlunosNegocio alunosNegocio;
    public AlunosController(ILogger<AlunosController> logger, AlunosNegocio alunosNegocio)
    {
        this.alunosNegocio = alunosNegocio;
        _logger = logger;
    }

    [HttpGet, Route("obter")]
    public async Task<IActionResult> Obter()
    {
        return await alunosNegocio.Obter();
    }
    [HttpGet, Route("obterAluno/{id}")]
    public async Task<IActionResult> ObterAlunoPorId([FromRoute] string id)
    {
        return await alunosNegocio.ObterAlunoPorId(id);
    }
    [HttpPost, Route("obterAlunosPorLista")]
    public async Task<IActionResult> ObterAlunosPorLista([FromBody] List<string> id)
    {
        return await alunosNegocio.ObterAlunosPorLista(id);
    }
    [HttpGet, Route("obterPorInstituicao/{id}")]
    public async Task<IActionResult> ObterAlunoporInstituicao([FromRoute] string id)
    {
        return await alunosNegocio.ObterAlunoporInstituicao(id);
    }
}
