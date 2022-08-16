using BibliotecaGamificada.Comum.Classes.Enums;
using BibliotecaGamificada.Comum.Classes.Firebase;
using BibliotecaGamificada.Comum.Classes.Models;
using BibliotecaGamificada.Pontos.Comum.Repositorios;
using BibliotecaGamificada.Professores.Api.Models;
using BibliotecaGamificada.Professores.Comum.Entidades;
using BibliotecaGamificada.Professores.Comum.Repositorios;
using BibliotecaGamificada.Turmas.Comum.Entidades;
using BibliotecaGamificada.Turmas.Comum.Repositorios;
using BibliotecaGamificada.Usuario.Comum.Repositorios;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Professores.Negocios
{
    public class ProfessoresNegocio
    {
        private readonly ProfessorRepositorio professorRepositorio;
        private readonly UsuarioRepositorio usuarioRepositorio;
        private readonly PontoRepositorio pontoRepositorio;
        private readonly TurmaRepositorio turmaRepositorio;
        private readonly FireBaseComum firebase;

        public ProfessoresNegocio(UsuarioRepositorio usuarioRepositorio, ProfessorRepositorio professorRepositorio, PontoRepositorio pontoRepositorio, TurmaRepositorio turmaRepositorio, FireBaseComum firebase)
        {
            this.firebase = firebase;
            this.professorRepositorio= professorRepositorio;
            this.pontoRepositorio = pontoRepositorio;
            this.turmaRepositorio = turmaRepositorio;
            this.usuarioRepositorio = usuarioRepositorio;
        }

        public async Task<IActionResult> Obter()
        {
            RetornoMsg msg;
            var professores = await professorRepositorio.Obter();
            if (professores == null || professores.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", professores);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> ObterProfessorPorId(string id)
        {
            RetornoMsg msg;
            var professores = await professorRepositorio.ObterPorId(id);
            if (professores == null)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", professores);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> ObterProfessorporInstituicao(string id)
        {
            RetornoMsg msg;
            var professores = await professorRepositorio.ObterPorInstituicao(id);
            if (professores == null)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", professores);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> CadastrarProfessor(ProfessorCadastroModel professor)
        {
            string foto = "../../../assets/images/default_avatar.png";
            try
            {
                var bs = new AzureBlobStorage();

                if (professor.foto != foto)
                {
                    foto = await bs.UploadImagem(professor.foto!, "imagens");
                }

                var p = new Professor(professor.telefone, professor.instituicao, professor.nome, professor.email, foto, professor.permissao);
                await firebase.DefinirPermissaoUsuario(professor.email, Permissao.professor);
                await professorRepositorio.Cadastrar(p);
            }
            catch (Exception e)
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao cadastrar", e));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Professor Registrado"));
        }

        public async Task<IActionResult> ExcluirProfessor(string id)
        {
            try
            {
                var professor = await professorRepositorio.ObterPorId(id);
                if (professor.email != null)
                    await firebase.RemoverUsuario(professor.email);
                await professorRepositorio.Excluir(id);
                var turmasProfessor = await turmaRepositorio.ObterPorProfessor(id);
                if(turmasProfessor != null && turmasProfessor.Count()>0)
                {
                    foreach(Turma listaturmas in turmasProfessor)
                    {
                        await pontoRepositorio.ExcluirporTurma(listaturmas.Id!);
                    }
                }
                await turmaRepositorio.ExcluirporProfessor(id);
            }
            catch
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao exluir"));
            }

            return new OkObjectResult(new RetornoMsg("sucesso", "Professor Excluido"));
        }

        public async Task<IActionResult> EditarProfessor(ProfessorCadastroModel professor)
        {
            string foto = "../../../assets/images/default_avatar.png";
            var bs = new AzureBlobStorage();
            try
            {
                var professorAnterior = await professorRepositorio.ObterPorId(professor.id!);
                var buscaEmail = await usuarioRepositorio.ObterPorEmail(professor.email);

                if(buscaEmail.Count()>0 || buscaEmail == null){
                    return new OkObjectResult(new RetornoMsg("erro", "Email ja é utilizado"));
                }

                if (professorAnterior.email != professorAnterior.email)
                {
                    await firebase.AtualizarEmailUsuario(professorAnterior.email, professor.email);
                }

                if (professor.foto != foto && professor.foto != professorAnterior.foto)
                {
                    foto = await bs.UploadImagem(professor.foto!, "imagens");
                }
                else
                {
                    foto = professor.foto!;
                }

                var p = new Professor(professor.telefone, professor.instituicao, professor.nome, professor.email, foto, professor.permissao);
                p.Id = professor.id;
                await professorRepositorio.Editar(p);
            }
            catch
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao editar"));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Professor editado"));
        }

    }
}