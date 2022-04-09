
using BibliotecaGamificada.Classificacao.Api.Entidades;
using BibliotecaGamificada.Comum.Classes.Repositorio;
using BibliotecaGamificada.Comum.Classes.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BibliotecaGamificada.Classificacao.Api.Repositorios
{
    public class ClassificacaoRepositorio : MongoDBBase<Ponto>
    {
        public ClassificacaoRepositorio(IConfiguration configuracao, IMongoClient mongoClient, IOptions<MongoDBSettings> settings) : base(configuracao, mongoClient, "pontos", settings) { }

        public async Task<List<Ponto>> Obter()
        {
            return await this.ObterDados(new BsonDocument(), e => e.aluno);
        }
        public async Task<Ponto> ObterPorId(string id)
        {
            return await this.ObterPorId(id);
        }
    }
}