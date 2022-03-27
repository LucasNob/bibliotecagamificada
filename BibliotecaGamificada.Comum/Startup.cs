using System.Security.Authentication;
using MongoDB.Driver;

namespace BibliotecaGamificada.Comum
{
    public class Startup
    {
     public static void ConfigureServicesEnvironmentVariable(IServiceCollection services, string variableName = "dbConnectionString"){
            services.AddSingleton<IMongoClient>((s) =>{
                return ObterVariavelAmbiente(variableName);
            });
        }

        private static IMongoClient ObterVariavelAmbiente(string variableName)
        {
            var stringConexao = Environment.GetEnvironmentVariable(variableName); //obtem valor da variavel de ambiente, local -> path

            var settings = MongoClientSettings.FromUrl(
                new MongoUrl(stringConexao)
            );

            settings.SslSettings = new SslSettings()
            {
                EnabledSslProtocols = SslProtocols.Tls12
            };
            return new MongoClient(settings);
        }
    }
}