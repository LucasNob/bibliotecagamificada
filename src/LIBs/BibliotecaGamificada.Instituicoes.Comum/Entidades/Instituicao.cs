using BibliotecaGamificada.Comum.Classes.Entidades;
using BibliotecaGamificada.Comum.Classes.Enums;
using BibliotecaGamificada.Instituicoes.Comum.Enums;

namespace BibliotecaGamificada.Instituicoes.Comum.Entidades
{
       // TODO Herdar atributos do usuário base
    public class Instituicao : UsuarioBase
    {
        public List<GrauEscolaridade> grauEscolaridade {get; set;}
        public int cep {get; set;}
        public string endereco {get; set;}
        public int numero {get; set;}

    public Instituicao (List<GrauEscolaridade> grauEscolaridade, int cep, string endereco, int numero,string senha, string nome, string email, string foto, Permissao permissao): base(senha, nome, email, foto, permissao)
{
    this.grauEscolaridade = grauEscolaridade;
    this.cep = cep;
    this.endereco = endereco;
    this.numero = numero;
}
    
    }
}
