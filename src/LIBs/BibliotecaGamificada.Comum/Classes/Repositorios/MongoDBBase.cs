

using System.Linq.Expressions;
using BibliotecaGamificada.Comum.Classes.Entidades;
using BibliotecaGamificada.Comum.Classes.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BibliotecaGamificada.Comum.Classes.Repositorio
{
    public class MongoDBBase<C> where C : EntidadeRepositorioBase
    {
        public readonly IMongoCollection<C> colecao;
        private readonly IConfiguration configuracao;
        private readonly IMongoClient clienteMongo;
        protected readonly IMongoDatabase database;
        private readonly string nomeColecao;


        public MongoDBBase(
            IConfiguration configuracao,
            IMongoClient clienteMongo,
            string nomeColecao,
            IOptions<MongoDBSettings> settings)
        {
            this.configuracao = configuracao;
            
            var nomeDatabase = Environment.GetEnvironmentVariable("nomeDatabase");
            if(nomeDatabase == null)
                throw new Exception("Variavel de ambiente para nome de database nao encontrada");
            
            this.database = clienteMongo.GetDatabase(nomeDatabase);
            this.clienteMongo = clienteMongo;
            this.nomeColecao = nomeColecao;
            this.colecao = this.database.GetCollection<C>(nomeColecao);
        }

        /// <summary>
        /// Retorna dados de um tipo C baseado em um filtro customizado
        /// </summary>
        /// <param name="filtro"></param>
        /// <param name="sort"></param>
        /// <returns></returns>
        protected async Task<List<C>> ObterDados(FilterDefinition<C>? filtro, Expression<Func<C, object>> sort)
        {
            return await this.colecao
                .Find(filtro)
                .SortBy(sort)
                .ToListAsync();
        }
        /// <summary>
        /// Retorna dado do banco por id do objeto
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        protected async Task<C> ObterDadosPorId(string id)
        {
            var filtro = Builders<C>.Filter.Eq(p => p.Id, id);
            return await this.colecao.Find(filtro).SingleOrDefaultAsync();
        }
        protected async Task<C> ObterDadosPorFiltro(FilterDefinition<C> filtro)
        {
            return await this.colecao.Find(filtro).SingleOrDefaultAsync();
        }
         protected async Task<List<C>> ObterListaDadosPorFiltro(FilterDefinition<C> filtro)
        {
            return await this.colecao.Find(filtro).ToListAsync<C>();
        }
        /// <summary>
        /// Inserir dados de um modelo
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        protected async Task<string> InserirDados(C model)
        {

            model.Id = Guid.NewGuid().ToString();
            model.DataCriacao = DateTime.Now;
            model.DataAlteracao = DateTime.Now;
            model.DataExclusao = null;
            model.Status = true;

            await this.colecao.InsertOneAsync(model);

            return model.Id;
        }
        /// <summary>
        /// "exclui" dados marcando o campo herdado do obejto base "dataExclusao" como a data atual. Dados ainda disponiveis para consultas internas.
        /// </summary>
        /// <param name="id">Id do objeto</param>
        /// <returns></returns>
        protected async Task ExclusaoDado(string id)
        {
            var filtroPorId = Builders<C>.Filter.Eq("Id", id);
            var builder = Builders<C>.Update
                    .Set(p => p.DataExclusao, DateTime.Now)
                    .Set(p => p.Status, false);
            await this.colecao.UpdateOneAsync(filtroPorId, builder);
        }
        /// <summary>
        /// Exclui um unico registro da base por filtro, dados ficam indisponiveis
        /// </summary>
        /// <param name="filtro">filtro</param>
        /// <returns></returns>
        protected async Task ExcluirDado(FilterDefinition<C> filtro, CancellationToken cancellationToken = default)
        {
            await this.colecao.DeleteOneAsync(filtro, cancellationToken);
        }
        /// <summary>
        /// Exclui multiplos registros da base por filtro, dados ficam indisponives
        /// </summary>
        /// <param name="filtro">filtro</param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        protected async Task ExcluirDados(FilterDefinition<C> filtro, CancellationToken cancellationToken = default)
        {
            await this.colecao.DeleteManyAsync(filtro, cancellationToken);
        }

        protected async Task AtualizarDados(C model, UpdateDefinition<C> updateDefinition)
        {
            var filtro = Builders<C>.Filter.Eq(p => p.Id, model.Id);

            await this.colecao.UpdateOneAsync(filtro, updateDefinition);
        }
        protected async Task AtualizarMultiplosDados(FilterDefinition<C>? filtro,UpdateDefinition<C> update)
        {
            var result = await this.colecao.UpdateManyAsync(filtro,update);
        }
    }
}