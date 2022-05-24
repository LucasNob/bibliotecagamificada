using BibliotecaGamificada.Comum.Classes.Repositorio;
using BibliotecaGamificada.Comum.Classes.Settings;
using BibliotecaGamificada.Livros.Comum.Entidades;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BibliotecaGamificada.Livros.Comum.Repositorios
{
    public class LivroRepositorio : MongoDBBase<Livro>
    {
        public LivroRepositorio(IConfiguration configuracao, IMongoClient mongoClient, IOptions<MongoDBSettings> settings) :
        base(configuracao, mongoClient, "livros", settings)
        { }

        public async Task<List<Livro>> Obter()
        {
            return await this.ObterDados(new BsonDocument(), e => e.titulo);
        }

        public async Task<Livro> ObterPorId(string id)
        {
            return await this.ObterDadosPorId(id);
        }

        public async Task<List<Livro>> ObterPorInstituicao(string id)
        {
            var filtro = Builders<Livro>.Filter.Eq(p => p.instituicao, id);
            return await this.ObterListaDadosPorFiltro(filtro);
        }

        public async Task<string> Cadastrar(Livro livro)
        {
            return await this.InserirDados(livro);
        }

        public async Task Excluir(string id)
        {
            var filtro = Builders<Livro>.Filter.Eq(p => p.Id, id);
            // await this.ExclusaoDado(id);
            await this.ExcluirDados(filtro);
        }

        public async Task Editar(Livro livro)
        {
            var atualizacao = Builders<Livro>.Update.Combine(
            Builders<Livro>.Update
            .Set(x => x.titulo, livro.titulo)
            .Set(x => x.autor, livro.autor)
            .Set(x => x.genero, livro.genero)
            .Set(x => x.capa, livro.capa)
            );
            await this.AtualizarDados(livro, atualizacao);
        }

        public async Task<List<Livro>> ObterPorListaId(List<string> ids)
        {
            var filtro = Builders<Livro>.Filter.In(p => p.Id, ids);
            return await this.ObterListaDadosPorFiltro(filtro);
        }
    }
}