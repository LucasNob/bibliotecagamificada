using BibliotecaGamificada.Comum.Classes.Repositorio;
using BibliotecaGamificada.Comum.Classes.Settings;
using BibliotecaGamificada.Instituicoes.Comum.Entidades;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BibliotecaGamificada.Instituicoes.Comum.Repositorios
{
    public class InstituicaoRepositorio : MongoDBBase<Instituicao>
    {
        public InstituicaoRepositorio(IConfiguration configuracao, IMongoClient mongoClient, IOptions<MongoDBSettings> settings) :
         base(configuracao, mongoClient, "usuarios", settings) { }

        public async Task<List<Instituicao>> Obter()
        {
            return await this.ObterDados(new BsonDocument(), e => e.nome);
        }

        public async Task<Instituicao> ObterPorId(string id)
        {
             return await this.ObterDadosPorId(id);
        }
    }
}