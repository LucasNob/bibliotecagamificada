using BibliotecaGamificada.Comum.Classes.Enums;

namespace BibliotecaGamificada.Alunos.Api.Models
{
    public class AlunoCadastroModel{
        public string? id { get; set; }
        public DateTime dataNascimento{ get; set; }
        public string instituicao { get; set;}
        public string senha {get; set;}
        public string nome { get; set;}
        public string email {get; set;}
        public string? foto { get; set; }
        public Permissao permissao { get; set; }

        public AlunoCadastroModel(DateTime dataNascimento, string instituicao, string senha,string nome, string email, string foto, Permissao permissao)
        {
            this.dataNascimento = dataNascimento;
            this.instituicao = instituicao;
            this.senha = senha;
            this.nome = nome;
            this.email = email;
            this.foto = foto;
            this.permissao = permissao;
        }

    }
}