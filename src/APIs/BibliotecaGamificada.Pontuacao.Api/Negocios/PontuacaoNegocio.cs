using BibliotecaGamificada.Pontuacao.Models;
using BibliotecaGamificada.Comum.Classes.Models;
using BibliotecaGamificada.Pontos.Comum.Entidades;
using BibliotecaGamificada.Pontos.Comum.Repositorios;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Pontuacao.Negocios
{
    public class PontuacaoNegocio
    {
        private readonly PontoRepositorio pontuacaoRepositorio;

        public PontuacaoNegocio(PontoRepositorio pontuacaoRepositorio)
        {
            this.pontuacaoRepositorio = pontuacaoRepositorio;
        }

        public async Task<IActionResult> AtualizarPontoLivrosLidos(PontoAtualizacao atualizacao)
        {
            try
            {
                var pontos = await pontuacaoRepositorio.ObterPorAluno(atualizacao.idAluno);
                var ponto = pontos.Find(p => p.turma == atualizacao.idTurma);
                if (ponto == null)
                    throw new Exception("Registro não encontrado");
                var ponto2 = new Ponto();

                ponto2.livrosLidos = atualizacao.livrosLidos;
                ponto2.totalPontos += ponto.totalPontos + atualizacao.livrosLidos.Count - ponto.livrosLidos.Count;

                await pontuacaoRepositorio.AtualizarPontoLivrosLidos(ponto, ponto2);
            }
            catch (Exception e)
            {
                return new OkObjectResult(new RetornoMsg("erro", "Registros não encontrados", e));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Livros Atualizados"));
        }

    }
}