using BibliotecaGamificada.Comum.Classes.Entidades;
using BibliotecaGamificada.Comum.Classes.Enums;
using BibliotecaGamificada.Instituicoes.Comum.Enums;

namespace BibliotecaGamificada.Instituicoes.Comum.Entidades
{
    public class Instituicao : UsuarioBase
    {
        public List<GrauEscolaridade> grauEscolaridade {get; set;}
        public string cep {get; set;}
        public string endereco {get; set;}

    public Instituicao (List<GrauEscolaridade> grauEscolaridade, string cep, string endereco, string nome, string email, string foto, Permissao permissao): base(nome, email, foto, permissao)
    {
        this.grauEscolaridade = grauEscolaridade;
        this.cep = cep;
        this.endereco = endereco;
    }
    
    }
}
