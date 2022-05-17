namespace BibliotecaGamificada.Comum.Classes.Models
{
    public class RetornoMsg
    {
        public string status { get; set; }
        public string mensagem { get; set; }
        public object? objeto { get; set; }
        public RetornoMsg(string status, string mensagem, object? objeto)
        {
            this.status = status;
            this.mensagem = mensagem;
            this.objeto = objeto;
        }
        public RetornoMsg(string status, string mensagem)
        {
            this.status = status;
            this.mensagem = mensagem;
            this.objeto = objeto;
        }
    }
}