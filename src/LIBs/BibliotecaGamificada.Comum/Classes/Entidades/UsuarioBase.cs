using BibliotecaGamificada.Comum.Classes.Entidades;

namespace BibliotecaGamificada.Classificacao.Api.Entidades
{
    public class UsuarioBase : EntidadeRepositorioBase
    {
        public string senha { get; set; }
        public string nome { get; set; }
        public string permissao { get; set; }
        
        //TODO: string fotoPerfil; 
        public UsuarioBase(string senha, string nome, string permissao)
        {
            this.senha = senha;
            this.nome = nome;
            this.permissao = permissao;
        }
        
    }
}