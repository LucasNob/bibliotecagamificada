using BibliotecaGamificada.Turmas.Api.Models;
using BibliotecaGamificada.Turmas.Negocios;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Turmas.Controllers;

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
        return await turmaNegocio.ObterTurmas();
    }
    [HttpGet, Route("obterTurma/{id}")]
    public async Task<IActionResult> ObterTurma([FromRoute]string id)
    {
        return await turmaNegocio.ObterTurmaPorId(id);
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
    [HttpGet, Route("obterTurmasInstituicao/{id}")]
    public async Task<IActionResult> ObterTurmasPorInstituicao([FromRoute] string id)
    {
        return await turmaNegocio.ObterTurmasPorInstituicao(id);
    }
    [HttpPost, Route("cadastrarTurma")]
    public async Task<IActionResult> CadastrarTurma([FromBody] TurmaCadastroModel turma)
    {
        return await turmaNegocio.CadastrarTurma(turma);
    }
    [HttpPut, Route("editarTurma")]
    public async Task<IActionResult> EditarTurma([FromBody] TurmaCadastroModel turma)
    {
        return await turmaNegocio.EditarTurma(turma);
    }
    [HttpDelete, Route("excluirTurma/{id}")]
    public async Task<IActionResult> ExcluirTurma([FromRoute] string id)
    {
        return await turmaNegocio.ExcluirTurma(id);
    }
    //Caso não seja o método correto de se aplicar alterar
    [HttpPut, Route("removerAlunoTurma/{id}/{id2}")]
    public async Task<IActionResult> RemoverAlunoporTurma([FromRoute] string turma, string aluno)
    {
        return await turmaNegocio.RemoverAlunoporTurma(turma, aluno);
    }
    //Caso não seja o método correto de se aplicar alterar
    [HttpPut, Route("removerLivroTurma/{id}/{id2}")]
    public async Task<IActionResult> RemoverLivroporTurma([FromRoute] string turma, string livro)
    {
        return await turmaNegocio.RemoverLivroporTurma(turma, livro);
    }
    [HttpPut, Route("atualizarLivrosTurma")]
    public async Task<IActionResult> AtualizarLivrosporTurma([FromBody] TurmaCadastroModel turma)
    {
        return await turmaNegocio.AtualizarLivrosporTurma(turma);
    }
    [HttpPut, Route("atualizarAlunosTurma")]
    public async Task<IActionResult> AtualizarAlunosporTurma([FromBody] TurmaCadastroModel turma)
    {
        return await turmaNegocio.AtualizarAlunosporTurma(turma);
    }
}