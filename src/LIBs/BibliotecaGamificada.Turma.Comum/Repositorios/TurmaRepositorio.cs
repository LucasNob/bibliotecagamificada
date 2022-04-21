using BibliotecaGamificada.Comum.Classes.Repositorio;
using BibliotecaGamificada.Comum.Classes.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BibliotecaGamificada.Turma.Comum.Entidades
{
    public class TurmaRepositorio : MongoDBBase<Turma>
    {
        public TurmaRepositorio(IConfiguration configuracao, IMongoClient mongoClient, IOptions<MongoDBSettings> settings) :
            base(configuracao, mongoClient, "turmas", settings)
        { }

        public async Task<List<Turma>> Obter()
        {
            return await this.ObterDados(new BsonDocument(), e => e.nome);
        }
        public async Task<Turma> ObterTurmaPorId(string id)
        {
            return await this.ObterDadosPorId(id);
        }
        public async Task<List<Turma>> ObterTurmasPorIdUsuario(string id)
        {
            //Alterar método, turmas possui lista de id de alunos e não um id único de aluno.
            var filtro = Builders<Turma>.Filter.Eq(p => p.alunos[0],id);
            return await this.ObterListaDadosPorFiltro(filtro);
        }
     }
}