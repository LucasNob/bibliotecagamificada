using BibliotecaGamificada.Alunos.Comum.Repositorios;
using BibliotecaGamificada.Comum.Classes.Enums;
using BibliotecaGamificada.Comum.Classes.Firebase;
using BibliotecaGamificada.Comum.Classes.Models;
using BibliotecaGamificada.Instituicoes.Api.Models;
using BibliotecaGamificada.Instituicoes.Comum.Entidades;
using BibliotecaGamificada.Instituicoes.Comum.Repositorios;
using BibliotecaGamificada.Livros.Comum.Entidades;
using BibliotecaGamificada.Livros.Comum.Repositorios;
using BibliotecaGamificada.Pontos.Comum.Repositorios;
using BibliotecaGamificada.Professores.Comum.Entidades;
using BibliotecaGamificada.Professores.Comum.Repositorios;
using BibliotecaGamificada.Quizzes.Comum.Repositorios;
using BibliotecaGamificada.Turmas.Comum.Repositorios;
using BibliotecaGamificada.Usuario.Comum.Repositorios;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Instituicoes.Negocios
{
    public class InstituicoesNegocio
    {
        private readonly InstituicaoRepositorio instituicaoRepositorio;
        private readonly UsuarioRepositorio usuarioRepositorio;
        private readonly ProfessorRepositorio professorRepositorio;
        private readonly AlunoRepositorio alunoRepositorio;
        private readonly LivroRepositorio livroRepositorio;
        private readonly PontoRepositorio pontoRepositorio;
        private readonly TurmaRepositorio turmaRepositorio;
        private readonly QuizRepositorio quizRepositorio;
        private readonly FireBaseComum firebase;

        public InstituicoesNegocio(UsuarioRepositorio usuarioRepositorio,
                                   InstituicaoRepositorio instituicaoRepositorio,
                                   ProfessorRepositorio professorRepositorio,
                                   AlunoRepositorio alunoRepositorio,
                                   LivroRepositorio livroRepositorio,
                                   PontoRepositorio pontoRepositorio,
                                   TurmaRepositorio turmaRepositorio,
                                   QuizRepositorio quizRepositorio,
                                   FireBaseComum firebase)
        {
            this.firebase = firebase;
            this.instituicaoRepositorio = instituicaoRepositorio;
            this.professorRepositorio = professorRepositorio;
            this.alunoRepositorio = alunoRepositorio;
            this.livroRepositorio = livroRepositorio;
            this.pontoRepositorio = pontoRepositorio;
            this.turmaRepositorio = turmaRepositorio;
            this.usuarioRepositorio = usuarioRepositorio;
            this.quizRepositorio = quizRepositorio;
        }

        public async Task<IActionResult> Obter()
        {
            RetornoMsg msg;
            var instituicoes = await instituicaoRepositorio.Obter();
            if (instituicoes == null || instituicoes.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", instituicoes);

            return new OkObjectResult(msg);
        }

        internal async Task<IActionResult> ObterInstituicaoPorId(string id)
        {
            RetornoMsg msg;
            var instituicoes = await instituicaoRepositorio.ObterPorId(id);
            if (instituicoes == null)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", instituicoes);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> CadastrarInstituicao(InstituicaoCadastroModel instituicao)
        {
            string foto = "../../../assets/images/default_avatar.png";
            try
            {
                var bs = new AzureBlobStorage();

                if (instituicao.foto != foto)
                {
                    foto = await bs.UploadImagem(instituicao.foto!, "imagens");
                }

                var i = new Instituicao(instituicao.grauEscolaridade, instituicao.cep, instituicao.endereco, instituicao.nome, instituicao.email, foto, Permissao.instituicao);
                await firebase.DefinirPermissaoUsuario(instituicao.email, Permissao.instituicao);
                await instituicaoRepositorio.Cadastrar(i);
            }
            catch (Exception e)
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao cadastrar", e));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Instituicao Registrada"));
        }

        public async Task<IActionResult> ExcluirInstituicao(string id)
        {
            try
            {
                var instituicao = await instituicaoRepositorio.ObterPorId(id);
                var professoresInstituicao = await professorRepositorio.ObterPorInstituicao(id);
                var alunosInstituicao = await alunoRepositorio.ObterPorInstituicao(id);

                if (instituicao.email != null)
                    await firebase.RemoverUsuario(instituicao.email);

                if (professoresInstituicao != null && professoresInstituicao.Count() > 0)
                {
                    foreach (Professor professor in professoresInstituicao)
                    {
                        if (professor.email != null)
                            await firebase.RemoverUsuario(professor.email);
                    }
                }

                if (alunosInstituicao != null && alunosInstituicao.Count() > 0)
                {
                    foreach (Aluno aluno in alunosInstituicao)
                    {
                        if (aluno.email != null)
                            await firebase.RemoverUsuario(aluno.email);
                    }
                }

                await instituicaoRepositorio.Excluir(id);
                await professorRepositorio.ExcluirporInstituicao(id);
                await alunoRepositorio.ExcluirporInstituicao(id);
                await livroRepositorio.ExcluirporInstituicao(id);
                await turmaRepositorio.ExcluirporInstituicao(id);
                await pontoRepositorio.ExcluirporInstituicao(id);
                await quizRepositorio.ExcluirporInstituicao(id);
            }
            catch
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao excluir"));
            }

            return new OkObjectResult(new RetornoMsg("sucesso", "Instituição Excluida"));
        }

        public async Task<IActionResult> EditarInstituicao(InstituicaoCadastroModel instituicao)
        {
            string foto = "../../../assets/images/default_avatar.png";
            var bs = new AzureBlobStorage();
            try
            {
                var instituicaoAnterior = await instituicaoRepositorio.ObterPorId(instituicao.id!);
                var buscaEmail = await usuarioRepositorio.ObterPorEmail(instituicao.email);

                if (buscaEmail.Count() > 0 || buscaEmail == null)
                {
                    if (instituicaoAnterior.email != instituicao.email)
                        return new OkObjectResult(new RetornoMsg("erro", "Email ja é utilizado"));
                }

                if (instituicaoAnterior.email != instituicao.email)
                {
                    await firebase.AtualizarEmailUsuario(instituicaoAnterior.email, instituicao.email);
                }

                if (instituicao.foto != foto && instituicao.foto != instituicaoAnterior.foto)
                {
                    foto = await bs.UploadImagem(instituicao.foto!, "imagens");
                }
                else
                {
                    foto = instituicao.foto!;
                }

                var i = new Instituicao(instituicao.grauEscolaridade, instituicao.cep, instituicao.endereco, instituicao.nome, instituicao.email, foto, instituicao.permissao);
                i.Id = instituicao.id;
                await instituicaoRepositorio.Editar(i);
            }
            catch (Exception e)
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro: " + e.Message));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Instituicao editada"));
        }


    }
}