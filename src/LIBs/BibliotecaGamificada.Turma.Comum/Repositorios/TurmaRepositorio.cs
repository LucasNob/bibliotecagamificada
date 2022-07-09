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
        public async Task<Turma> ObterPorId(string id)
        {
            return await this.ObterDadosPorId(id);
        }
        public async Task<List<Turma>> ObterPorAluno(string id)
        {
            var filtro = Builders<Turma>.Filter.AnyEq(x => x.alunos, id);
            return await this.ObterListaDadosPorFiltro(filtro);
        }
        public async Task<List<Turma>> ObterPorProfessor(string id)
        {
            var filtro = Builders<Turma>.Filter.Eq(x => x.professor, id);
            return await this.ObterListaDadosPorFiltro(filtro);
        }
    }
}