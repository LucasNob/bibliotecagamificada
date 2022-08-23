using BibliotecaGamificada.Comum.Classes.Enums;
using BibliotecaGamificada.Instituicoes.Comum.Enums;

namespace BibliotecaGamificada.Instituicoes.Api.Models
{
    public class InstituicaoCadastroModel{
        public string? id { get; set; }
        public List<GrauEscolaridade> grauEscolaridade {get; set;}
        public int cep {get; set;}
        public string endereco {get; set;}
        public string nome { get; set;}
        public string email {get; set;}
        public string? foto { get; set; }
        public Permissao permissao { get; set; }

        public InstituicaoCadastroModel(List<GrauEscolaridade> grauEscolaridade, int cep, string endereco, string nome, string email, string foto, Permissao permissao)
        {
            this.grauEscolaridade = grauEscolaridade;
            this.cep = cep;
            this.endereco = endereco;
            this.nome = nome;
            this.email = email;
            this.foto = foto;
            this.permissao = permissao;
        }

    }
}