using BibliotecaGamificada.Comum.Classes.Repositorio;
using BibliotecaGamificada.Comum.Classes.Settings;
using BibliotecaGamificada.Professores.Comum.Entidades;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BibliotecaGamificada.Professores.Comum.Repositorios
{
    public class ProfessorRepositorio : MongoDBBase<Professor>
    {
        public ProfessorRepositorio(IConfiguration configuracao, IMongoClient mongoClient, IOptions<MongoDBSettings> settings) :
         base(configuracao, mongoClient, "usuarios", settings) { }

        public async Task<List<Professor>> Obter()
        {
            return await this.ObterDados(new BsonDocument(), e => e.nome);
        }

        public async Task<Professor> ObterPorId(string id)
        {
            return await this.ObterDadosPorId(id);
        }

        public async Task<List<Professor>> ObterPorInstituicao(string id)
        {
            var filtro = Builders<Professor>.Filter.Eq(p => p.instituicao, id);
            return await this.ObterListaDadosPorFiltro(filtro);
        }

    }
}