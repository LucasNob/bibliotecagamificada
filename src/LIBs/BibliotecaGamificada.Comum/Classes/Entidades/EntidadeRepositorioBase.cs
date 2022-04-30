namespace BibliotecaGamificada.Comum.Classes.Entidades
{
    public class EntidadeRepositorioBase
    {  
        public string? Id { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime DataAlteracao { get; set; }
        public DateTime? DataExclusao { get; set; }
        public bool Status { get; set; }
    }
}