using BibliotecaGamificada.Comum.Classes.Models;
using BibliotecaGamificada.Livros.Comum.Entidades;
using BibliotecaGamificada.Livros.Comum.Repositorios;
using Microsoft.AspNetCore.Mvc;

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
  
        public async Task<IActionResult> CadastrarLivro(Livro livro)
        {
            try
            {
                await livroRepositorio.Cadastrar(livro);
            }
            catch 
            {
               return new OkObjectResult(new RetornoMsg("erro", "Erro ao cadastrar"));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Livro Registrado"));
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
   
          public async Task<IActionResult> EditarLivro(Livro livro)
        {
            try
            {
                await livroRepositorio.Editar(livro);
            }
            catch 
            {
               return new OkObjectResult(new RetornoMsg("erro", "Erro ao exluir"));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Livro Excluido"));
        }

    }
}