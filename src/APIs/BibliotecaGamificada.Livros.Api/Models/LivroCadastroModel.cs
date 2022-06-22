using BibliotecaGamificada.Livros.Comum.Enums;

namespace BibliotecaGamificada.Livros.Api.Models
{
    public class LivroCadastroModel
    {
        public string? id { get; set; }
        public string titulo { get; set; }
        public string autor { get; set; }
        public string? capa { get; set; }
        public Genero genero { get; set; }
        public string instituicao { get; set; }

        public LivroCadastroModel(string titulo, string autor, string capa, Genero genero, string instituicao)
        {
            this.titulo = titulo;
            this.autor = autor;
            this.capa = capa;
            this.genero = genero;
            this.instituicao = instituicao;
        }
    }
}