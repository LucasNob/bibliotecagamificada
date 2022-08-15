using BibliotecaGamificada.Comum.Classes.Entidades;
using BibliotecaGamificada.Comum.Classes.Enums;

namespace BibliotecaGamificada.Professores.Comum.Entidades
{
    public class Professor : UsuarioBase
    {
        public string telefone {get; set;}
        public string instituicao {get; set;}

    public Professor (string telefone, string instituicao, string nome, string email, string foto, Permissao permissao): base(nome, email, foto, permissao)
    {
        this.telefone = telefone;
        this.instituicao = instituicao;
    }
    
    }
}
