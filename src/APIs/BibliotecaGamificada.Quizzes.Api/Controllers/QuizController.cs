using BibliotecaGamificada.Quizzes.Api.Models;
using BibliotecaGamificada.Quizzes.Negocios;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Quizzes.Controllers;

[ApiController]
[Route("/v1/quiz")]
public class QuizController : ControllerBase
{
    private readonly ILogger<QuizController> _logger;
    private readonly QuizNegocio quizNegocio;
    public QuizController(ILogger<QuizController> logger, QuizNegocio quizNegocio)
    {
        this.quizNegocio = quizNegocio;
        _logger = logger;
    }

    [HttpGet, Route("obter")]
    public async Task<IActionResult> ObterQuiz()
    {
        return await quizNegocio.ObterQuizzes();
    }
    [HttpGet, Route("obterQuiz/{id}")]
    public async Task<IActionResult> ObterQuiz([FromRoute] string id)
    {
        return await quizNegocio.ObterQuizPorId(id);
    }
    [HttpGet, Route("obterQuizzesPorLivro/{id}")]
    public async Task<IActionResult> ObterQuizzesPorLivro([FromRoute] string id)
    {
        return await quizNegocio.ObterQuizzesPorLivro(id);
    }
    [HttpPost, Route("cadastrarQuiz")]
    public async Task<IActionResult> CadastrarQuiz([FromBody] QuizCadastroModel Quiz)
    {
        return await quizNegocio.CadastrarQuiz(Quiz);
    }
    [HttpPut, Route("editarQuiz")]
    public async Task<IActionResult> EditarQuiz([FromBody] QuizCadastroModel Quiz)
    {
        return await quizNegocio.EditarQuiz(Quiz);
    }
    [HttpDelete, Route("excluirQuiz/{id}")]
    public async Task<IActionResult> ExcluirQuiz([FromRoute] string id)
    {
        return await quizNegocio.ExcluirQuiz(id);
    }
}