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
        public async Task AtualizarPontoLivrosLidos(Ponto atual, Ponto novo){
            var update = Builders<Ponto>.Update.Combine(
                Builders<Ponto>.Update
                .Set(x =>x.livrosLidos, novo.livrosLidos)
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
        public async Task ExcluirporAluno(string aluno, string turma)
        {

        }

         public async Task RemoverLivroLido()
        {
            
        }



    }   
}