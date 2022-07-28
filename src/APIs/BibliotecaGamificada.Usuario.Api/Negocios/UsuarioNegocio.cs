using Microsoft.AspNetCore.Mvc;
using BibliotecaGamificada.Comum.Classes.Models;

namespace BibliotecaGamificada.Usuario.Negocios
{
    public class UsuarioNegocio
    {

        public UsuarioNegocio()
        {
        
        }
        
        public async Task<IActionResult> Login()
        {
            return new OkObjectResult(new RetornoMsg("sucesso", "Código Executado"));
        }

        public async Task<IActionResult> Logout()
        {
            return new OkObjectResult(new RetornoMsg("sucesso", "Código Executado"));
        }

        public async Task<IActionResult> AlterarSenha()
        {
            return new OkObjectResult(new RetornoMsg("sucesso", "Código Executado"));
        }

      
    }
}