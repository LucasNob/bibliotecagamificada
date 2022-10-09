using BibliotecaGamificada.Comum.Classes.Models;
using BibliotecaGamificada.Pontos.Comum.Repositorios;
using BibliotecaGamificada.Quizzes.Comum.Repositorios;
using Microsoft.AspNetCore.Mvc;
using BibliotecaGamificada.Quizzes.Comum.Entidades;
using BibliotecaGamificada.Turmas.Api.Models;

namespace BibliotecaGamificada.quizzes.Negocios
{
    public class QuizNegocio
    {
        private readonly QuizRepositorio quizRepositorio;
        private readonly PontoRepositorio pontoRepositorio;

        public QuizNegocio(QuizRepositorio quizRepositorio, PontoRepositorio pontoRepositorio)
        {
            this.quizRepositorio = quizRepositorio;
            this.pontoRepositorio = pontoRepositorio;
        }

        public async Task<IActionResult> ObterQuizzes()
        {
            RetornoMsg msg;
            var quizzes = await quizRepositorio.Obter();
            if (quizzes == null || quizzes.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
            {
                msg = new RetornoMsg("sucesso", "retorno enviado", quizzes);
            }

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> ObterquizzesPorLivro(string id)
        {
            RetornoMsg msg;
            var quizzes = await quizRepositorio.ObterPorLivro(id);

            if (quizzes == null || quizzes.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
            {
                msg = new RetornoMsg("sucesso", "retorno enviado", quizzes);
            }

            return new OkObjectResult(msg);
        }


        public async Task<IActionResult> ObterQuizPorId(string id)
        {
            RetornoMsg msg;
            var quizzes = await quizRepositorio.ObterPorId(id);
            if (quizzes == null)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", quizzes);

            return new OkObjectResult(msg);
        }
        public async Task<IActionResult> CadastrarQuiz(QuizCadastroModel quiz)
        {
            try
            {
                var t = new Quiz(quiz.pergunta, quiz.alternativas, quiz.resposta, quiz.livro, quiz.instituicao);

                await quizRepositorio.Cadastrar(t);
            }
            catch (Exception e)
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao cadastrar", e));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Quiz Registrada"));
        }

        public async Task<IActionResult> ExcluirPorInstituicao(string id)
        {
            try
            {
                await quizRepositorio.ExcluirporInstituicao(id);
            }
            catch
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao excluir"));
            }

            return new OkObjectResult(new RetornoMsg("sucesso", "Quiz excluída Excluido"));
        }
        public async Task<IActionResult> ExcluirQuiz(string id)
        {
            try
            {
                await quizRepositorio.Excluir(id);
            }
            catch
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao excluir"));
            }

            return new OkObjectResult(new RetornoMsg("sucesso", "Quiz Excluido"));
        }

        public async Task<IActionResult> EditarQuiz(QuizCadastroModel quiz)
        {
            try
            {
                var t = new Quiz(quiz.pergunta, quiz.alternativas, quiz.resposta, quiz.livro, quiz.instituicao);
                t.Id = quiz.id;
                await quizRepositorio.Editar(t);
            }
            catch (Exception e)
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao editar", e));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Quiz Editada"));
        }
    }
}