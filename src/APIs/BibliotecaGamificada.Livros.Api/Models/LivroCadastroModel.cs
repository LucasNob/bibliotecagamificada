namespace BibliotecaGamificada.Livros.Api.Models
{
    public class LivroCadastroModel
    {
        public string titulo;
        public string autor;
        public string capa;
        public int genero;
        public string instituicao;

        public LivroCadastroModel(string titulo, string autor, string capa, int genero, string instituicao)
        {
            this.titulo = titulo;
            this.autor = autor;
            this.capa = capa;
            this.genero = genero;
            this.instituicao = instituicao;
        }
    }
}