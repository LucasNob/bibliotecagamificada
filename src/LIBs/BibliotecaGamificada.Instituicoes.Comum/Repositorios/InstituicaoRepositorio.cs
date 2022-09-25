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
        
        public async Task<string> Cadastrar(Instituicao instituicao)
        {
            return await this.InserirDados(instituicao);
        }

        public async Task Excluir(string id)
        {
            var filtro = Builders<Instituicao>.Filter.Eq(p => p.Id, id);
            await this.ExcluirDado(filtro);
        }
        
        public async Task Editar(Instituicao instituicao)
        {
            var atualizacao = Builders<Instituicao>.Update.Combine(
            Builders<Instituicao>.Update
            .Set(x => x.nome, instituicao.nome)
            .Set(x => x.email, instituicao.email)
            .Set(x => x.foto, instituicao.foto)
            .Set(x => x.grauEscolaridade, instituicao.grauEscolaridade)
            .Set(x => x.cep, instituicao.cep)
            .Set(x => x.endereco, instituicao.endereco)
            );
            await this.AtualizarDados(instituicao, atualizacao);
        }
    }
}