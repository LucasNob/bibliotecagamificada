namespace BibliotecaGamificada.Comum.Classes.Entidade
{
    public class EntidadeRepositorioBase
    {
        public string Id { get; internal set; }
        public DateTime DataCriacao { get; internal set; }
        public DateTime DataAlteracao { get; internal set; }
        public DateTime? DataExclusao { get; internal set; }
        public bool Status { get; internal set; }

        public EntidadeRepositorioBase(
            string id,
            DateTime dataCriacao, 
            DateTime dataAlteracao, 
            DateTime dataExclusao, 
            bool status
            )
        {
            Id = id;
            DataCriacao = dataCriacao;
            DataAlteracao = dataAlteracao;
            DataExclusao = dataExclusao;
            Status = status;
        }
    }
}