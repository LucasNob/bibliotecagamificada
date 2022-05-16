using BibliotecaGamificada.Comum.Classes.Models;
using BibliotecaGamificada.Livros.Api.Models;
using BibliotecaGamificada.Livros.Comum.Entidades;
using BibliotecaGamificada.Livros.Comum.Repositorios;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace BibliotecaGamificada.Livros.Negocios
{
    public class LivrosNegocio
    {
        private readonly LivroRepositorio livroRepositorio;

        public LivrosNegocio(LivroRepositorio livroRepositorio)
        {
            this.livroRepositorio = livroRepositorio;
        }

        public async Task<IActionResult> Obter()
        {
            RetornoMsg msg;
            var livros = await livroRepositorio.Obter();

            if (livros == null || livros.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", livros);

            return new OkObjectResult(msg);
        }

        internal async Task<IActionResult> ObterPorId(string id)
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

        public async Task<IActionResult> ObterLivrosPorListaId(List<string> ids)
        {
            RetornoMsg msg;
            var livros = await livroRepositorio.ObterPorListaId(ids);
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