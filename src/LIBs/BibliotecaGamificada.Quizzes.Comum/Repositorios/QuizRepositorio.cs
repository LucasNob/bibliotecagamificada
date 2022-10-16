using BibliotecaGamificada.Comum.Classes.Repositorio;
using BibliotecaGamificada.Comum.Classes.Settings;
using BibliotecaGamificada.Quizzes.Comum.Entidades;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BibliotecaGamificada.Quizzes.Comum.Repositorios
{
    public class QuizRepositorio : MongoDBBase<Quiz>
    {
        public QuizRepositorio(IConfiguration configuracao, IMongoClient mongoClient, IOptions<MongoDBSettings> settings) :
        base(configuracao, mongoClient, "quizzes", settings)
        { }

        public async Task<List<Quiz>> Obter()
        {
            return await this.ObterDados(new BsonDocument(), e => e.pergunta);
        }

        public async Task<Quiz> ObterPorId(string id)
        {
            return await this.ObterDadosPorId(id);
        }

        public async Task<List<Quiz>> ObterPorLivro(string id)
        {
            var filtro = Builders<Quiz>.Filter.Eq(q => q.livro, id);
            return await this.ObterListaDadosPorFiltro(filtro);
        }

        public async Task<string> Cadastrar(Quiz quiz)
        {
            return await this.InserirDados(quiz);
        }

        public async Task Excluir(string id)
        {
            var filtro = Builders<Quiz>.Filter.Eq(q => q.Id, id);
            await this.ExcluirDado(filtro);
        }

        public async Task ExcluirporLivro(string id)
        {
            var filtro = Builders<Quiz>.Filter.Eq(q => q.livro, id);
            await this.ExcluirDados(filtro);
        }

        public async Task ExcluirporInstituicao(string id)
        {
            var filtro = Builders<Quiz>.Filter.Eq(q => q.instituicao, id);
            await this.ExcluirDados(filtro);
        }

        public async Task Editar(Quiz quiz)
        {
            var atualizacao = Builders<Quiz>.Update.Combine(
            Builders<Quiz>.Update
            .Set(x => x.pergunta, quiz.pergunta)
            .Set(x => x.alternativas, quiz.alternativas)
            .Set(x => x.resposta, quiz.resposta)
            );
            await this.AtualizarDados(quiz, atualizacao);
        }
    }
}