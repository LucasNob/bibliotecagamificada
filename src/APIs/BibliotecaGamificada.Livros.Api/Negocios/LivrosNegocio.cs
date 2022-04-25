using BibliotecaGamificada.Comum.Classes.Models;
using BibliotecaGamificada.Livros.Api.Models;
using BibliotecaGamificada.Livros.Comum.Entidades;
using BibliotecaGamificada.Livros.Comum.Enums;
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
            try
            {
                // var livro = new Livro("a", Comum.Enums.Genero.Conto, "a", "c", "I");
                // var t1 = JsonSerializer.Serialize(livro);

                // var livro = JsonSerializer.Deserialize<Livro>(l);

                // if(livro == null)
                //     throw new NullReferenceException();

                var l = new Livro(livro.titulo, (Genero)livro.genero, livro.autor, livro.capa, livro.instituicao);

                await livroRepositorio.Cadastrar(l);
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
   
          public async Task<IActionResult> EditarLivro(string l)
        {
            try
            {
                var livro = JsonSerializer.Deserialize<Livro>(l);
                
                if(livro == null)
                    throw new NullReferenceException();

                await livroRepositorio.Editar(livro);
            }
            catch 
            {
               return new OkObjectResult(new RetornoMsg("erro", "Erro ao editar"));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Livro editado"));
        }

    }
}