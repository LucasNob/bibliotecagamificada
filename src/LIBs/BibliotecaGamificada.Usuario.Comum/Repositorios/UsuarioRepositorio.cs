using BibliotecaGamificada.Comum.Classes.Entidades;
using BibliotecaGamificada.Comum.Classes.Enums;
using BibliotecaGamificada.Comum.Classes.Repositorio;
using BibliotecaGamificada.Comum.Classes.Settings;
using BibliotecaGamificada.Livros.Comum.Entidades;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BibliotecaGamificada.Usuario.Comum.Repositorios
{
    public class UsuarioRepositorio : MongoDBBase<UsuarioBase>
    {
        public UsuarioRepositorio(IConfiguration configuracao, IMongoClient mongoClient, IOptions<MongoDBSettings> settings) :
        base(configuracao, mongoClient, "usuarios", settings)
        { }

        public async Task<List<UsuarioBase>> Obter()
        {
            return await this.ObterDados(new BsonDocument(), e => e.nome);
        }

        public async Task<List<UsuarioBase>> ObterPorEmail(string email)
        {
            var filtro = Builders<UsuarioBase>.Filter.Eq(x => x.email, email);
            return await this.ObterListaDadosPorFiltro(filtro);
        }
    }
}