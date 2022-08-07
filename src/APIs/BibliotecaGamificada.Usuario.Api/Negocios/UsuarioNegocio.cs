using Microsoft.AspNetCore.Mvc;
using BibliotecaGamificada.Usuario.Comum.Repositorios;
using BibliotecaGamificada.Comum.Classes.Models;

namespace BibliotecaGamificada.Usuario.Negocios
{
    public class UsuarioNegocio
    {
        private UsuarioRepositorio usuarioRepositorio;
        public UsuarioNegocio(UsuarioRepositorio usuarioRepositorio)
        {
            this.usuarioRepositorio = usuarioRepositorio;
        }

        public async Task<IActionResult> obterPorEmail(string email)
        {
            RetornoMsg msg;
            var usuarios = await usuarioRepositorio.ObterPorEmail(email);
            if (usuarios == null || usuarios.Count ==0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", usuarios[0]);

            return new OkObjectResult(msg);
        }
    }
}