using BibliotecaGamificada.Comum.Classes.Entidades;
using BibliotecaGamificada.Livros.Comum.Enums;

namespace BibliotecaGamificada.Livros.Comum.Entidades
{
    public class Livro : EntidadeRepositorioBase 
    {
        public string titulo { get; set; }
        public string autor { get; set; }
        public Genero genero { get; set; }
        public string? capa { get; set; }
        public string instituicao { get; set;}

        public Livro(string titulo, Genero genero, string autor, string capa, string instituicao)
        {
            this.titulo = titulo;
            this.genero = genero;
            this.autor = autor;
            this.capa = capa;
            this.instituicao = instituicao;
        }
    }
}
