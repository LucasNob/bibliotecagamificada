using System.Collections.ObjectModel;
using System.Linq.Expressions;
using BibliotecaGamificada.Comum.Classes.Entidade;
using MongoDB.Driver;

namespace BibliotecaGamificada.Comum.Classes.Repositorio
{
    public class MongoDBBase<C> where C: EntidadeRepositorioBase
    {
        public readonly IMongoCollection<C> colecao;
        private readonly IConfiguration configuracao;
        private readonly IMongoClient clienteMongo;
        protected readonly IMongoDatabase database;
        private readonly string nomeColecao;

        public MongoDBBase(
            IConfiguration configuracao,
            IMongoClient clienteMongo,
            string nomeColecao){
            this.configuracao = configuracao;
            this.database = clienteMongo.GetDatabase(configuracao.GetSection("App").GetSection("MongoDB").Get<string>());
            this.clienteMongo = clienteMongo;
            this.nomeColecao = nomeColecao;
            this.colecao = this.database.GetCollection<C>(nomeColecao);
        }
        protected async Task<List<C>> ObterDados(FilterDefinition<C>? filtro, Expression<Func<C, object>> sort){
            return await this.colecao
            .Find(filtro)
            .SortBy(sort)
            .ToListAsync();
        }
        protected async Task<string> InserirDados(C model){
            
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
        protected async Task ExclusaoDado(string id){
            var filtroPorId = Builders<C>.Filter.Eq("Id", id);
            var builder = Builders<C>.Update
                    .Set(p => p.DataExclusao, DateTime.Now)
                    .Set(p => p.Status, false);
            await this.colecao.UpdateOneAsync(filtroPorId, builder);
        }
        /// <summary>
        /// Exclui os dados da base, dados ficam indisponiveis
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        protected void ExcluirDados(FilterDefinition<C> filtro,CancellationToken cancellationToken = default){
            this.colecao.DeleteOne(filtro,cancellationToken);
        }

        protected async Task AtualizarDados(C model, UpdateDefinition<C> updateDefinition){
              var filtro = Builders<C>.Filter.Eq(p => p.Id, model.Id);

            await this.colecao.UpdateOneAsync(filtro, updateDefinition);
        }
    }
}