using BibliotecaGamificada.Professores.Api.Models;
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
    [HttpGet, Route("obterPorInstituicao/{id}")]
    public async Task<IActionResult> ObterProfessorporInstituicao([FromRoute] string id)
    {
        return await professoresNegocio.ObterProfessorporInstituicao(id);
    }
    [HttpPost, Route("cadastrarProfessor")]
    public async Task<IActionResult> CadastrarProfessor([FromBody] ProfessorCadastroModel professor)
    {
        return await professoresNegocio.CadastrarProfessor(professor);
    }

    [HttpPut, Route("editarProfessor")]
    public async Task<IActionResult> EditarProfessor([FromBody] ProfessorCadastroModel professor)
    {
        return await professoresNegocio.EditarProfessor(professor);
    }

    [HttpDelete, Route("excluirProfessor/{id}")]
    public async Task<IActionResult> ExcluirProfessor([FromRoute] string id)
    {
        return await professoresNegocio.ExcluirProfessor(id);
    }
}
