using BibliotecaGamificada.Comum.Classes.Enums;

namespace BibliotecaGamificada.Professores.Api.Models
{
    public class ProfessorCadastroModel{
        public string? id { get; set; }
        public string telefone{ get; set; }
        public string instituicao { get; set;}
        public string nome { get; set;}
        public string email {get; set;}
        public string? foto { get; set; }
        public Permissao permissao { get; set; }

        public ProfessorCadastroModel(string telefone, string instituicao, string nome, string email, string foto, Permissao permissao)
        {
            this.telefone = telefone;
            this.instituicao = instituicao;
            this.nome = nome;
            this.email = email;
            this.foto = foto;
            this.permissao = permissao;
        }

    }
}