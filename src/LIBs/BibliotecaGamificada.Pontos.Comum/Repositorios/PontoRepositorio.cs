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
         base(configuracao, mongoClient, "pontos", settings) { }

        public async Task<List<Ponto>> Obter()
        {
            return await this.ObterDados(new BsonDocument(), e => e.aluno);
        }

        public async Task<Ponto> ObterPorId(string id)
        {
             return await this.ObterDadosPorId(id);
        }
        public async Task<Ponto> ObterPorFiltro(string id)
        {
            var filtro = Builders<Ponto>.Filter.Eq(p => p.turma, id);
            return await this.ObterDadosPorFiltro(filtro);
        }
    }
}