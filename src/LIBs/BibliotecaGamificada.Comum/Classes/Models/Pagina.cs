namespace BibliotecaGamificada.Comum.Classes.Models
{
    public class Pagina<T> where T : class
    {
        public int nPaginas { get; set; }
        public int nRegistros{ get; set; }
        public IList<T>? dados { get; set; } 
        
        public Pagina() { }
    }
}