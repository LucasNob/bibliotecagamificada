using BibliotecaGamificada.Comum.Classes.Enums;
using BibliotecaGamificada.Comum.Classes.Repositorio;
using BibliotecaGamificada.Comum.Classes.Settings;
using BibliotecaGamificada.Livros.Comum.Entidades;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BibliotecaGamificada.Alunos.Comum.Repositorios
{
    public class AlunoRepositorio : MongoDBBase<Aluno>
    {
        public AlunoRepositorio(IConfiguration configuracao, IMongoClient mongoClient, IOptions<MongoDBSettings> settings) :
        base(configuracao, mongoClient, "usuarios", settings)
        { }

        public async Task<List<Aluno>> Obter()
        {
            return await this.ObterDados(new BsonDocument(), e => e.nome);
        }

        public async Task<Aluno> ObterPorId(string id)
        {
            return await this.ObterDadosPorId(id);
        }

        public async Task<List<Aluno>> ObterPorInstituicao(string id)
        {
            var filtro = Builders<Aluno>.Filter.And(Builders<Aluno>.Filter.Eq(p => p.instituicao, id),
                Builders<Aluno>.Filter.Eq(p => p.permissao, Permissao.aluno));
            return await this.ObterListaDadosPorFiltro(filtro);
        }

        public async Task<string> Cadastrar(Aluno aluno)
        {
            return await this.InserirDados(aluno);
        }

        public async Task Excluir(string id)
        {
            var filtro = Builders<Aluno>.Filter.Eq(p => p.Id, id);
            await this.ExcluirDado(filtro);
        }

        public async Task<List<Aluno>> ObterPorLista(List<string> id)
        {
            var filtro = Builders<Aluno>.Filter.In(p => p.Id, id);
            return await this.ObterListaDadosPorFiltro(filtro);
        }
    }
}