using BibliotecaGamificada.Comum.Classes.Entidades;
using BibliotecaGamificada.Comum.Classes.Enums;
using MongoDB.Bson.Serialization.Attributes;

namespace  BibliotecaGamificada.Comum.Classes.Entidades
{
    [BsonIgnoreExtraElements]
    public class UsuarioBase : EntidadeRepositorioBase
    {
        public string nome { get; set; }
        public string email { get; set; }
        public string foto { get; set; }
        public Permissao permissao { get; set; }
        public UsuarioBase(string nome, string email, string foto, Permissao permissao)
        {
            this.nome = nome;
            this.email = email;
            this.foto = foto;
            this.permissao = permissao;
        }
    }
}