using BibliotecaGamificada.Comum.Classes.Repositorio;
using BibliotecaGamificada.Comum.Classes.Settings;
using BibliotecaGamificada.Pontos.Comum.Entidades;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BibliotecaGamificada.Pontos.Comum.Repositorios
{
    public class PontoRepositorio : MongoDBBase<Ponto>
    {
        public PontoRepositorio(IConfiguration configuracao, IMongoClient mongoClient, IOptions<MongoDBSettings> settings) :
         base(configuracao, mongoClient, "pontos", settings)
        { }

        public async Task<List<Ponto>> Obter()
        {
            return await this.ObterDados(new BsonDocument(), e => e.aluno);
        }

        public async Task<Ponto> ObterPorId(string id)
        {
            return await this.ObterDadosPorId(id);
        }
        public async Task<List<Ponto>> ObterPorTurma(string id)
        {
            var filtro = Builders<Ponto>.Filter.Eq(p => p.turma, id);
            return await this.ObterListaDadosPorFiltro(filtro);
        }
         public async Task<List<Ponto>> ObterPorAluno(string id)
        {
            var filtro = Builders<Ponto>.Filter.Eq(p => p.aluno, id);
            return await this.ObterListaDadosPorFiltro(filtro);
        }
        public async Task AtualizarPontoLivrosLidos(Ponto atual, Ponto novo){
            var update = Builders<Ponto>.Update.Combine(
                Builders<Ponto>.Update
                .Set(x =>x.livrosLidos, novo.livrosLidos)
                .Set(x => x.totalPontos,novo.totalPontos)
            );
            await this.AtualizarDados(atual,update);
        }
        
        public async Task<string> Cadastrar(Ponto ponto)
        {
            return await this.InserirDados(ponto);
        }

        public async Task ExcluirporTurma(string id)
        {
            var filtro = Builders<Ponto>.Filter.Eq(p => p.turma, id);
            await this.ExcluirDados(filtro);
        }
        public async Task ExcluirporAluno(string aluno, string turma)
        {
            var filtro = Builders<Ponto>.Filter.Eq(p => p.aluno, aluno) & Builders<Ponto>.Filter.Eq(p => p.turma, turma);
            await this.ExcluirDados(filtro);
        }

        // public async Task RemoverLivroLido(Ponto atual, Ponto novo)
        // {
        //     // Utilizado para remover em uma turma, remover em todos utilizar FOR
        //     var update = Builders<Ponto>.Update.Combine(Builders<Ponto>.Update
        //         .Set(x =>x.livrosLidos, novo.livrosLidos)
        //     );
        //     await this.AtualizarDados(atual,update);
        // }
        
        public async Task RemoverLivroLido(string idLivro)
        {
            var update = Builders<Ponto>.Update.Pull(p => p.livrosLidos, idLivro);
            await this.AtualizarMultiplosDados(new BsonDocument(),update);
        }
         public async Task RemoverLivroLidoPorTurma(string idLivro,string idTurma)
        {
            var update = Builders<Ponto>.Update.Pull(p => p.livrosLidos, idLivro);
            
            var filtro = Builders<Ponto>.Filter.Eq(t => t.turma, idTurma);
            // await this.AtualizarMultiplosDados(filtro,update);
            await this.AtualizarMultiplosDados(filtro,update);
        }
    }   
}