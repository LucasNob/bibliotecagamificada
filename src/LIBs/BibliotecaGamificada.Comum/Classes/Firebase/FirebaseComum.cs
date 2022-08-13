

using System.Linq.Expressions;
using System.Threading.Channels;
using BibliotecaGamificada.Comum.Classes.Entidades;
using BibliotecaGamificada.Comum.Classes.Settings;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BibliotecaGamificada.Comum.Classes.Firebase
{
    public class FireBaseComum
    {
        private ILogger<FireBaseComum> log;
        private IConfiguration configuracao;
        private FirebaseAuth firebaseInstance;
        public FireBaseComum(IConfiguration configuracao,ILogger<FireBaseComum> log)
        {
            this.configuracao = configuracao;
            this.log = log;

            // var credenciais = Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS");
            var conf = configuracao.GetSection("Firebase").Value;
            if (conf == null)
                throw new Exception("Variavel de ambiente para credenciais do google nao encontrada");
            var credenciais = GoogleCredential.FromJson(conf);
            
            this.firebaseInstance = this.ObterApp(credenciais);
        }
        private FirebaseAuth ObterApp(GoogleCredential credenciais, string nome = "default"){
            // var credential = GoogleCredential.FromJson(Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS"));
            var app = FirebaseApp.Create(new AppOptions(){Credential = credenciais},nome);
            var firebaseInstance = FirebaseAuth.GetAuth(app);
            return firebaseInstance;
        }
        public async Task RemoverUsuario(string email){
            try{
                var usuario = await ObterUsuario(email);
                await firebaseInstance.DeleteUserAsync(usuario.Uid);
            }
            catch(Exception e){
                log.LogError("Erro ao excluir usuario: " + e.Message);
            }
        }
        public async Task AtulizarEmailUsuario(string emailAtual, string emailNovo){
            try{
                var usuario = await ObterUsuario(emailAtual);
                UserRecordArgs args = new UserRecordArgs()
                {
                    Uid = usuario.Uid,
                    Email = emailNovo,
                };
                await firebaseInstance.UpdateUserAsync(args);
            }
            catch(Exception e){
                log.LogError("Erro ao mudar email usuario: " + e.Message);
            }
        }
        public async Task<UserRecord> ObterUsuario(string email){
            return await firebaseInstance.GetUserByEmailAsync(email);
        }

    }
}