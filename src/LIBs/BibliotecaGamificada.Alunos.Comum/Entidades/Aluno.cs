using BibliotecaGamificada.Comum.Classes.Entidades;
using BibliotecaGamificada.Comum.Classes.Enums;

namespace BibliotecaGamificada.Livros.Comum.Entidades
{
    public class Aluno : UsuarioBase 
    {
        public DateTime dataNascimento{ get; set; }
        public string instituicao { get; set;}
        public Aluno(DateTime dataNascimento, string instituicao, string nome, string email, string foto, Permissao permissao): base(nome, email, foto, permissao)
        {
            this.dataNascimento = dataNascimento;
            this.instituicao = instituicao;
        }
    }
}
