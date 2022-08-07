using BibliotecaGamificada.Usuario.Negocios;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaGamificada.Usuario.Controllers;

[ApiController]
[Route("/v1/usuario")]
public class UsuarioController : ControllerBase
{
    private readonly ILogger<UsuarioController> _logger;
    private readonly UsuarioNegocio usuarioNegocio;
    public UsuarioController(ILogger<UsuarioController> logger, UsuarioNegocio usuarioNegocio)
    {
        this.usuarioNegocio = usuarioNegocio;
        _logger = logger;
    }
    [HttpGet, Route("obterUsuario/{email}")]
    public async Task<IActionResult> ObterInstituicaoPorId([FromRoute] string email)
    {
        return await usuarioNegocio.obterPorEmail(email);
    }
}
