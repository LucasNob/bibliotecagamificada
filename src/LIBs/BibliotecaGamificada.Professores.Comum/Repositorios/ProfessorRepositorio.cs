using BibliotecaGamificada.Comum.Classes.Enums;
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
            var filtro = Builders<Professor>.Filter.And(Builders<Professor>.Filter.Eq(p => p.instituicao, id),
            Builders<Professor>.Filter.Eq(p => p.permissao, Permissao.professor));
            return await this.ObterListaDadosPorFiltro(filtro);
        }

        public async Task<string> Cadastrar(Professor professor)
        {
            return await this.InserirDados(professor);
        }

        public async Task Excluir(string id)
        {
            var filtro = Builders<Professor>.Filter.Eq(p => p.Id, id);
            await this.ExcluirDado(filtro);
        }

        public async Task ExcluirporInstituicao(string id)
        {
            var filtro = Builders<Professor>.Filter.Eq(p => p.instituicao, id);
            await this.ExcluirDados(filtro);
        }

        public async Task Editar(Professor professor)
        {
            var atualizacao = Builders<Professor>.Update.Combine(
            Builders<Professor>.Update
            .Set(x => x.nome, professor.nome)
            .Set(x => x.email, professor.email)
            .Set(x => x.foto, professor.foto)
            .Set(x => x.telefone, professor.telefone)
            );
            await this.AtualizarDados(professor, atualizacao);
        }

    }
}