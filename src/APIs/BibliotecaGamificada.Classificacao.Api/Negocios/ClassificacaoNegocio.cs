using BibliotecaGamificada.Classificacao.Api.Models;
using BibliotecaGamificada.Comum.Classes.Models;
using BibliotecaGamificada.Instituicoes.Comum.Repositorios;
using BibliotecaGamificada.Pontos.Comum.Entidades;
using BibliotecaGamificada.Pontos.Comum.Repositorios;
using BibliotecaGamificada.Professores.Comum.Repositorios;
using BibliotecaGamificada.Turmas.Comum.Entidades;
using BibliotecaGamificada.Turmas.Comum.Repositorios;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Classificacao.Negocios
{
    public class ClassificacaoNegocio
    {
        private readonly PontoRepositorio classificacaoRepositorio;
        private readonly TurmaRepositorio turmaRepositorio;
        private readonly InstituicaoRepositorio instituicaoRepositorio;
        private readonly ProfessorRepositorio professorRepositorio;

        public ClassificacaoNegocio(PontoRepositorio classificacaoRepositorio, TurmaRepositorio turmaRepositorio, InstituicaoRepositorio instituicaoRepositorio, ProfessorRepositorio professorRepositorio)
        {
            this.classificacaoRepositorio = classificacaoRepositorio;
            this.turmaRepositorio = turmaRepositorio;
            this.instituicaoRepositorio = instituicaoRepositorio;
            this.professorRepositorio = professorRepositorio;
        }

        public async Task<IActionResult> ObterPontos()
        {
            RetornoMsg msg;
            var classificacoes = await classificacaoRepositorio.Obter();
            if (classificacoes == null || classificacoes.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", classificacoes);

            return new OkObjectResult(msg);
        }
        public async Task<IActionResult> ObterPontosPorAluno(string idTurma, string idAluno)
        {
            RetornoMsg msg;
            var pontos = await classificacaoRepositorio.ObterPorAluno(idAluno);
            var ponto = pontos.Find(p => p.turma == idTurma);

            if (ponto == null)
                msg = new RetornoMsg("erro", "Registro não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", ponto);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> ObterPontosPorTurma(string id)
        {
            RetornoMsg msg;
            var classificacoes = await classificacaoRepositorio.ObterPorTurma(id);
            if (classificacoes == null)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", classificacoes);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> ObterRankingGlobal(int anoLetivo)
        {
            RetornoMsg msg;
            var instituicoes = new List<string>();
            var pontosRankingGlobal = new List<RankingGlobal>();

            var turmasAnoLetivo = await turmaRepositorio.ObterporAno(anoLetivo);

            if (turmasAnoLetivo != null && turmasAnoLetivo.Count() != 0)
            {
                foreach (Turma turma in turmasAnoLetivo)
                {
                    if (!instituicoes.Contains(turma.instituicao))
                    {
                        instituicoes.Add(turma.instituicao);
                    }
                }

                if (instituicoes.Count() != 0)
                {
                    foreach (String id in instituicoes)
                    {
                        var pontosInstituicao = await classificacaoRepositorio.ObterporInstituicao(id);

                        if (pontosInstituicao != null && pontosInstituicao.Count() != 0)
                        {
                            double quantidadePontos = 0;
                            foreach (Ponto ponto in pontosInstituicao)
                            {
                                if (turmasAnoLetivo.FindIndex(e => e.Id == ponto.turma) != -1)
                                    quantidadePontos += ponto.totalPontos;
                            }
                            var instituicao = await instituicaoRepositorio.ObterPorId(id);
                            var pontoRankingGlobal = new RankingGlobal(quantidadePontos, instituicao);
                            pontosRankingGlobal.Add(pontoRankingGlobal);
                        }
                    }
                    msg = new RetornoMsg("sucesso", "retorno enviado", pontosRankingGlobal);
                }
                else
                {
                    msg = new RetornoMsg("erro", "Registros não encontrados");
                }
            }
            else
            {
                msg = new RetornoMsg("erro", "Registros não encontrados");
            }

            return new OkObjectResult(msg);
        }
        public async Task<IActionResult> ObterRankingEscolar(int anoLetivo, string idInstituicao)
        {
            RetornoMsg msg;
            var pontosRankingEscolar = new List<RankingEscolar>();

            var turmasAnoLetivo = await turmaRepositorio.ObterporAno(anoLetivo);

            if (turmasAnoLetivo != null && turmasAnoLetivo.Count() != 0)
            {
                var turmasInstituicao = turmasAnoLetivo.Where(t => t.instituicao == idInstituicao);

                if (turmasInstituicao.Count() != 0)
                {
                    foreach (Turma turma in turmasInstituicao)
                    {
                        var pontosTurma = await classificacaoRepositorio.ObterPorTurma(turma.Id!);

                        if (pontosTurma != null && pontosTurma.Count() != 0)
                        {
                            double quantidadePontos = 0;

                            foreach (Ponto ponto in pontosTurma)
                            {
                                quantidadePontos += ponto.totalPontos;
                            }

                            var professorTurma = await professorRepositorio.ObterPorId(turma.professor);
                            var pontoRankingGlobal = new RankingEscolar(quantidadePontos, turma, professorTurma);
                            pontosRankingEscolar.Add(pontoRankingGlobal);
                        }
                    }
                    msg = new RetornoMsg("sucesso", "retorno enviado", pontosRankingEscolar);
                }
                else
                {
                    msg = new RetornoMsg("erro", "Registros não encontrados");
                }
            }
            else
            {
                msg = new RetornoMsg("erro", "Registros não encontrados");
            }

            return new OkObjectResult(msg);
        }
    }
}