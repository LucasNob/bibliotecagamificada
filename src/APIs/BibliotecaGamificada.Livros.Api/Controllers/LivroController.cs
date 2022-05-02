using BibliotecaGamificada.Livros.Api.Models;
using BibliotecaGamificada.Livros.Comum.Entidades;
using BibliotecaGamificada.Livros.Negocios;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Livros.Controllers;

[ApiController]
[Route("/v1/livro")]
public class LivroController : ControllerBase
{
    private readonly ILogger<LivroController> _logger;
    private readonly LivrosNegocio livroNegocio;

    public LivroController(ILogger<LivroController> logger, LivrosNegocio turmaNegocio)
    {
        this.livroNegocio = turmaNegocio;
        _logger = logger;
    }

    [HttpGet, Route("obter")]
    public async Task<IActionResult> ObterLivros()
    {
        return await livroNegocio.Obter();
    }

    [HttpGet, Route("obterLivro/{id}")]
    public async Task<IActionResult> ObterTurma([FromRoute] string id)
    {
        return await livroNegocio.ObterPorId(id);
    }

    [HttpGet, Route("obterPorInstituicao/{id}")]
    public async Task<IActionResult> ObterLivrosPorInstituicao([FromRoute] string id)
    {
        return await livroNegocio.ObterLivrosPorInstituicao(id);
    }

    [HttpPost, Route("cadastrarLivro")]
    public async Task<IActionResult> CadastrarLivro([FromBody] LivroCadastroModel livro)
    {
        return await livroNegocio.CadastrarLivro(livro);
    }

    [HttpPut, Route("editarLivro")]
    public async Task<IActionResult> EditarLivro([FromBody] LivroCadastroModel livro)
    {
        return await livroNegocio.EditarLivro(livro);
    }

    [HttpDelete, Route("excluirLivro/{id}")]
    public async Task<IActionResult> ExcluirLivro([FromRoute] string id)
    {
        return await livroNegocio.ExcluirLivro(id);
    }
}
