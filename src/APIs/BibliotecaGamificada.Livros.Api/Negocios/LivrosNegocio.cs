using BibliotecaGamificada.Comum.Classes.Models;
using BibliotecaGamificada.Livros.Api.Models;
using BibliotecaGamificada.Livros.Comum.Entidades;
using BibliotecaGamificada.Livros.Comum.Repositorios;
using BibliotecaGamificada.Pontos.Comum.Entidades;
using BibliotecaGamificada.Pontos.Comum.Repositorios;
using BibliotecaGamificada.Turmas.Comum.Entidades;
using BibliotecaGamificada.Turmas.Comum.Repositorios;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Livros.Negocios
{
    public class LivrosNegocio
    {
        private readonly LivroRepositorio livroRepositorio;
        private readonly TurmaRepositorio turmaRepositorio;

        private readonly PontoRepositorio pontoRepositorio;

        public LivrosNegocio(LivroRepositorio livroRepositorio, TurmaRepositorio turmaRepositorio, PontoRepositorio pontoRepositorio)
        {
            this.livroRepositorio = livroRepositorio;
            this.turmaRepositorio = turmaRepositorio;
            this.pontoRepositorio = pontoRepositorio;
        }

        public async Task<IActionResult> ObterLivros()
        {
            RetornoMsg msg;
            var livros = await livroRepositorio.Obter();

            if (livros == null || livros.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", livros);

            return new OkObjectResult(msg);
        }

        internal async Task<IActionResult> ObterLivroPorId(string id)
        {
            RetornoMsg msg;
            var livros = await livroRepositorio.ObterPorId(id);

            if (livros == null)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", livros);

            return new OkObjectResult(msg);
        }

        internal async Task<IActionResult> ObterLivrosPorInstituicao(string id)
        {
            RetornoMsg msg;

            var livros = await livroRepositorio.ObterPorInstituicao(id);

            if (livros == null)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", livros);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> CadastrarLivro(LivroCadastroModel livro)
        {
            string capa = "../../../assets/images/default_capa.png";
            try
            {
                var bs = new AzureBlobStorage();

                if (livro.capa != capa)
                {
                    capa = await bs.UploadImagem(livro.capa!, "imagens");
                }

                var l = new Livro(livro.titulo, livro.genero, livro.autor, capa, livro.instituicao);

                await livroRepositorio.Cadastrar(l);
            }
            catch (Exception e)
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao cadastrar", e));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Livro Registrado"));
        }

        public async Task<IActionResult> ObterLivrosPorLista(List<string> id)
        {
            RetornoMsg msg;
            var livros = await livroRepositorio.ObterPorLista(id);
            if (livros == null || livros.Count == 0 )
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", livros);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> ExcluirLivro(string id)
        {
            try
            {
                await livroRepositorio.Excluir(id);

                //Somente para livros únicos por instituição
                var turmas = await turmaRepositorio.Obter();
                if(turmas != null && turmas.Count > 0)
                {
                        foreach (Turma turmaslivros in turmas)
                        {
                            if (turmaslivros.livros.Contains(id))
                            {
                                var atual = turmaslivros;
                                turmaslivros.livros.Remove(id);
                                var novo = turmaslivros;
                                await turmaRepositorio.AtualizarLivros(atual, novo);
                            }
                            
                        }
                }
                var pontos = await pontoRepositorio.Obter();
                if(pontos != null && pontos.Count > 0)
                {
                        foreach (Ponto pontoslivros in pontos)
                        {
                            if (pontoslivros.livrosLidos.Contains(id))
                            {
                                var atual = pontoslivros;
                                pontoslivros.livrosLidos.Remove(id);
                                var novo = pontoslivros;
                                await pontoRepositorio.RemoverLivroLido(atual, novo);
                            }
                           
                        } 
                }
            }
            catch
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao exluir"));
            }

            return new OkObjectResult(new RetornoMsg("sucesso", "Livro Excluido"));
        }

        public async Task<IActionResult> EditarLivro(LivroCadastroModel livro)
        {
            string capa = "../../../assets/images/default_capa.png";
            try
            {
                var bs = new AzureBlobStorage();

                if (livro.capa != capa)
                {
                    capa = await bs.UploadImagem(livro.capa!, "imagens");
                }

                var l = new Livro(livro.titulo, livro.genero, livro.autor, capa, livro.instituicao);
                l.Id = livro.id;
                await livroRepositorio.Editar(l);
            }
            catch
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao editar"));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Livro editado"));
        }
    }
}