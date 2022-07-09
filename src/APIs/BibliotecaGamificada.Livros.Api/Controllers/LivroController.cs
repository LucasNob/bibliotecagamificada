using BibliotecaGamificada.Livros.Api.Models;
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
        return await livroNegocio.ObterLivros();
    }

    [HttpGet, Route("obterLivro/{id}")]
    public async Task<IActionResult> ObterLivro([FromRoute] string id)
    {
        return await livroNegocio.ObterLivroPorId(id);
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
      [HttpPost, Route("obterLivrosPorLista")]
    public async Task<IActionResult> ObterLivrosPorLista([FromBody] List<string> id)
    {
        return await livroNegocio.ObterLivrosPorLista(id);
    }
}
