using BibliotecaGamificada.Comum.Classes.Entidades;
using BibliotecaGamificada.Comum.Classes.Enums;

namespace  BibliotecaGamificada.Comum.Classes.Entidades
{
    public class UsuarioBase : EntidadeRepositorioBase
    {
        public string senha { get; set; }
        public string nome { get; set; }
        public string email { get; set; }
        public string foto { get; set; }
        public Permissao permissao { get; set; }
        
        //TODO: string fotoPerfil; 
        public UsuarioBase(string senha, string nome, string email, string foto, Permissao permissao)
        {
            this.senha = senha;
            this.nome = nome;
            this.email = email;
            this.foto = foto;
            this.permissao = permissao;
        }
        
    }
}