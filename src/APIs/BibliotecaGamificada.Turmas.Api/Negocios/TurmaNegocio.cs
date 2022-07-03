using BibliotecaGamificada.Comum.Classes.Models;
using BibliotecaGamificada.Pontos.Comum.Entidades;
using BibliotecaGamificada.Pontos.Comum.Repositorios;
using BibliotecaGamificada.Turmas.Api.Models;
using BibliotecaGamificada.Turmas.Comum.Entidades;
using BibliotecaGamificada.Turmas.Comum.Repositorios;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Turmas.Negocios
{
    public class TurmaNegocio
    {
        private readonly TurmaRepositorio turmaRepositorio;
        private readonly PontoRepositorio pontoRepositorio;

        public TurmaNegocio(TurmaRepositorio turmaRepositorio,PontoRepositorio pontoRepositorio)
        {
            this.turmaRepositorio = turmaRepositorio;
            this.pontoRepositorio = pontoRepositorio;
        }

        public async Task<IActionResult> ObterTurmas()
        {
            RetornoMsg msg;
            var turmas = await turmaRepositorio.Obter();
            if (turmas == null || turmas.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", turmas);

            return new OkObjectResult(msg);
        }
        public async Task<IActionResult> ObterTurmasPorAluno(string id)
        {
            RetornoMsg msg;
            var turmas = await turmaRepositorio.ObterPorAluno(id);

            if (turmas == null || turmas.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", turmas);

            return new OkObjectResult(msg);
        }
        public async Task<IActionResult> ObterTurmasPorProfessor(string id)
        {
            RetornoMsg msg;
            var turmas = await turmaRepositorio.ObterPorProfessor(id);

            if (turmas == null || turmas.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", turmas);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> ObterTurmasPorInstituicao(string id)
        {
            RetornoMsg msg;
            var turmas = await turmaRepositorio.ObterporInstituicao(id);

            if (turmas == null || turmas.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", turmas);

            return new OkObjectResult(msg);
        }


        public async Task<IActionResult> ObterTurmaPorId(string id)
        {
            RetornoMsg msg;
            var turma = await turmaRepositorio.ObterPorId(id);
            if (turma == null)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", turma);

            return new OkObjectResult(msg);
        }
        public async Task<IActionResult> CadastrarTurma(TurmaCadastroModel turma)
        {
            try
            {
                var t = new Turma(turma.nome, turma.anoLetivo, turma.professor, turma.instituicao, turma.alunos, turma.livros);

                await turmaRepositorio.Cadastrar(t);
            }
            catch (Exception e)
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao cadastrar", e));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Turma Registrada"));
        }

        public async Task<IActionResult> AtualizarLivrosporTurma(TurmaCadastroModel atualizacao)
        {
            try
            {
                //Caso ache necessário criar uma Model de Atualização para Turma
                if(atualizacao.id != null)
                {
                    var atual = await turmaRepositorio.ObterPorId(atualizacao.id);
                    var novo = new Turma();
                    novo.livros = atualizacao.livros;
                    await turmaRepositorio.AtualizarLivros(novo, atual);
                }
            }
            catch (Exception e)
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao adicionar livros", e));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Livros adicionados"));
        }

        public async Task<IActionResult> AtualizarAlunosporTurma(TurmaCadastroModel atualizacao)
        {
            try
            {
                //Caso ache necessário criar uma Model de Atualização para Turma
                if(atualizacao.id != null)
                {
                    var atual = await turmaRepositorio.ObterPorId(atualizacao.id);
                    var novo = new Turma();
                    novo.alunos = atualizacao.alunos;

                    var ponto = await pontoRepositorio.ObterPorTurma(atualizacao.id);
                    var alunos = new List<string>();
                    var novosalunos = new List<string>();

                    //Copiar alunos de todos os pontos da turma
                    foreach (Ponto alunosPonto in ponto)
                    {
                        alunos.Add(alunosPonto.aluno);
                    }

                    //Encontrar ALunos que não possuem ponto criado
                    if (novo.alunos != null)
                    {
                        novosalunos = (List<string>)novo.alunos.Except(alunos);
                    }
                    
                    //Para Novo Aluno Criar um Ponto Vazio
                    if(novosalunos.Count != 0)
                    {
                        for(int i=0; i< novosalunos.Count; i++)
                        {
                            var novoPonto = new Ponto(novosalunos[i],atualizacao.id, new List<string>(), 0, atualizacao.instituicao);
                            await pontoRepositorio.Cadastrar(novoPonto);
                        }
                    }                    
                    await turmaRepositorio.AtualizarAlunos(novo, atual);
                }
            }
            catch (Exception e)
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao adicionar livros", e));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Livros adicionados"));
        }


        public async Task<IActionResult> ExcluirTurma(string id)
        {
            try
            {
                await turmaRepositorio.Excluir(id);
                await pontoRepositorio.ExcluirporTurma(id);
            }
            catch
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao exluir"));
            }

            return new OkObjectResult(new RetornoMsg("sucesso", "Turma excluída Excluido"));
        }

        public async Task<IActionResult> EditarTurma(TurmaCadastroModel turma)
        {
            try
            {
                var t = new Turma(turma.nome, turma.anoLetivo, turma.professor, turma.instituicao, turma.alunos, turma.livros);
                t.Id = turma.id;
                await turmaRepositorio.Editar(t);
            }
            catch (Exception e)
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao editar", e));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Turma Editada"));
        }

        public async Task<IActionResult> RemoverAlunoporTurma(string turma, string aluno)
        {
            try
            {
                await turmaRepositorio.RemoverAlunoPorTurma(turma, aluno);
                await pontoRepositorio.ExcluirporAluno(turma, aluno);
            }
            catch (Exception e)
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao remover aluno", e));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Aluno Removido"));
        }
        public async Task<IActionResult> RemoverLivroporTurma(string turma, string livro)
        {
            try
            {
                await turmaRepositorio.RemoverLivroPorTurma(turma, livro);
                await pontoRepositorio.RemoverLivroLidoPorTurma(turma, livro);
            }
            catch (Exception e)
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao remover livro", e));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Livro Removido"));
        }


    }
}