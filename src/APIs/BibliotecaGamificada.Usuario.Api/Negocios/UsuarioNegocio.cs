using Microsoft.AspNetCore.Mvc;
using BibliotecaGamificada.Usuario.Comum.Repositorios;
using BibliotecaGamificada.Comum.Classes.Models;
using BibliotecaGamificada.Instituicoes.Comum.Repositorios;
using BibliotecaGamificada.Professores.Comum.Repositorios;
using BibliotecaGamificada.Alunos.Comum.Repositorios;
using BibliotecaGamificada.Comum.Classes.Enums;

namespace BibliotecaGamificada.Usuario.Negocios
{
    public class UsuarioNegocio
    {
        private UsuarioRepositorio usuarioRepositorio;
        private AlunoRepositorio alunoRepositorio;
        private ProfessorRepositorio professorRepositorio;
        private InstituicaoRepositorio instituicaoRepositorio;
        public UsuarioNegocio(UsuarioRepositorio usuarioRepositorio,
            AlunoRepositorio alunoRepositorio,
            ProfessorRepositorio professorRepositorio,
            InstituicaoRepositorio instituicaoRepositorio
            )
        {
            this.alunoRepositorio = alunoRepositorio;
            this.professorRepositorio = professorRepositorio;
            this.instituicaoRepositorio = instituicaoRepositorio;
            this.usuarioRepositorio = usuarioRepositorio;
        }

        public async Task<IActionResult> obterPorEmail(string email)
        {
            RetornoMsg msg;
            var usuarios = await usuarioRepositorio.ObterPorEmail(email);
            if (usuarios == null || usuarios.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
            {
                if (usuarios[0].permissao == Permissao.instituicao)
                {
                    var usuario = await instituicaoRepositorio.ObterPorId(usuarios[0].Id!);
                    msg = new RetornoMsg("sucesso", "retorno enviado", usuario);
                }
                else if (usuarios[0].permissao == Permissao.professor)
                {
                    var usuario = await professorRepositorio.ObterPorId(usuarios[0].Id!);
                    msg = new RetornoMsg("sucesso", "retorno enviado", usuario);
                }
                else
                {
                    var usuario = await alunoRepositorio.ObterPorId(usuarios[0].Id!);
                    msg = new RetornoMsg("sucesso", "retorno enviado", usuario);
                }
            }

            return new OkObjectResult(msg);
        }
    }
}