using BibliotecaGamificada.Comum.Classes.Repositorio;
using BibliotecaGamificada.Comum.Classes.Settings;
using BibliotecaGamificada.Pontos.Comum.Entidades;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BibliotecaGamificada.Pontos.Comum.Repositorios
{
    public class PontoRepositorio : MongoDBBase<Ponto>
    {
        public PontoRepositorio(IConfiguration configuracao, IMongoClient mongoClient, IOptions<MongoDBSettings> settings) :
         base(configuracao, mongoClient, "pontos", settings)
        { }

        public async Task<List<Ponto>> Obter()
        {
            return await this.ObterDados(new BsonDocument(), e => e.aluno);
        }

        public async Task<Ponto> ObterPorId(string id)
        {
            return await this.ObterDadosPorId(id);
        }
        public async Task<List<Ponto>> ObterPorTurma(string id)
        {
            var filtro = Builders<Ponto>.Filter.Eq(p => p.turma, id);
            return await this.ObterListaDadosPorFiltro(filtro);
        }
        public async Task<List<Ponto>> ObterPorAluno(string id)
        {
            var filtro = Builders<Ponto>.Filter.Eq(p => p.aluno, id);
            return await this.ObterListaDadosPorFiltro(filtro);
        }

        public async Task<List<Ponto>> ObterporInstituicao(string id)
        {
            var filtro = Builders<Ponto>.Filter.Eq(x => x.instituicao, id);
            return await this.ObterListaDadosPorFiltro(filtro);
        }

        public async Task AtualizarPontoLivrosLidos(Ponto atual, Ponto novo){
            var update = Builders<Ponto>.Update.Combine(
                Builders<Ponto>.Update
                .Set(x =>x.livrosLidos, novo.livrosLidos)
                .Set(x => x.totalPontos,novo.totalPontos)
            );
            await this.AtualizarDados(atual,update);
        }
        public async Task AtualizarPontoQuizLivros(Ponto atual, Ponto novo){
            var update = Builders<Ponto>.Update.Combine(
                Builders<Ponto>.Update
                .Set(x => x.livrosQuiz, novo.livrosQuiz)
                .Set(x => x.totalPontos,novo.totalPontos)
            );
            await this.AtualizarDados(atual,update);
        }
        
        public async Task<string> Cadastrar(Ponto ponto)
        {
            return await this.InserirDados(ponto);
        }

        public async Task ExcluirporTurma(string id)
        {
            var filtro = Builders<Ponto>.Filter.Eq(p => p.turma, id);
            await this.ExcluirDados(filtro);
        }

        public async Task ExcluirporInstituicao(string id)
        {
            var filtro = Builders<Ponto>.Filter.Eq(p => p.instituicao, id);
            await this.ExcluirDados(filtro);
        }
        
        public async Task ExcluirporAluno(string id)
        {
            var filtro = Builders<Ponto>.Filter.Eq(p => p.aluno, id);
            await this.ExcluirDados(filtro);
        }
        
        public async Task ExcluirporAlunoTurma(string turma, string aluno)
        {
            var filtro = Builders<Ponto>.Filter.Eq(p => p.aluno, aluno) & Builders<Ponto>.Filter.Eq(p => p.turma, turma);
            await this.ExcluirDado(filtro);
        }
        
        public async Task RemoverLivroLido(string idLivro)
        {
            var update = Builders<Ponto>.Update.Pull(p => p.livrosLidos, idLivro);
            await this.AtualizarMultiplosDados(new BsonDocument(),update);
        }
        public async Task RemoverLivroQuiz(string idLivro)
        {
            var update = Builders<Ponto>.Update.Pull(p => p.livrosQuiz, idLivro);
            await this.AtualizarMultiplosDados(new BsonDocument(),update);
        }

        public async Task RemoverLivroLidoPorTurma(string turma, string livro)
        {
            var update = Builders<Ponto>.Update.Pull(p => p.livrosLidos, livro);
            var filtro = Builders<Ponto>.Filter.Eq(t => t.turma, turma);
            await this.AtualizarMultiplosDados(filtro,update);
        }
        public async Task RemoverLivroQuizPorTurma(string turma, string livro)
        {
            var update = Builders<Ponto>.Update.Pull(p => p.livrosQuiz, livro);
            var filtro = Builders<Ponto>.Filter.Eq(t => t.turma, turma);
            await this.AtualizarMultiplosDados(filtro,update);
        }
    }   
}