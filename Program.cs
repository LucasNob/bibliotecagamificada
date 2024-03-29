using System.Security.Authentication;
using BibliotecaGamificada.Classificacao.Negocios;
using MongoDB.Driver;
using BibliotecaGamificada.Pontos.Comum.Repositorios;
using BibliotecaGamificada.Turmas.Negocios;
using BibliotecaGamificada.Turmas.Comum.Repositorios;
using BibliotecaGamificada.Instituicoes.Negocios;
using BibliotecaGamificada.Instituicoes.Comum.Repositorios;
using BibliotecaGamificada.Livros.Negocios;
using BibliotecaGamificada.Livros.Comum.Repositorios;
using BibliotecaGamificada.Alunos.Negocios;
using BibliotecaGamificada.Alunos.Comum.Repositorios;
using BibliotecaGamificada.Pontuacao.Negocios;
using BibliotecaGamificada.Professores.Negocios;
using BibliotecaGamificada.Professores.Comum.Repositorios;
using BibliotecaGamificada.Usuario.Negocios;
using BibliotecaGamificada.Usuario.Comum.Repositorios;
using BibliotecaGamificada.Comum.Classes.Firebase;
using BibliotecaGamificada.Quizzes.Comum.Repositorios;
using BibliotecaGamificada.Quizzes.Negocios;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

//pontuacao
builder.Services.AddTransient<PontuacaoNegocio>();

//classificacao
builder.Services.AddTransient<ClassificacaoNegocio>();
builder.Services.AddTransient<PontoRepositorio>();

//turma
builder.Services.AddTransient<TurmaNegocio>();
builder.Services.AddTransient<TurmaRepositorio>();

//instituicao
builder.Services.AddTransient<InstituicoesNegocio>();
builder.Services.AddTransient<InstituicaoRepositorio>();

//livro
builder.Services.AddTransient<LivrosNegocio>();
builder.Services.AddTransient<LivroRepositorio>();

//aluno
builder.Services.AddTransient<AlunosNegocio>();
builder.Services.AddTransient<AlunoRepositorio>();

//professor
builder.Services.AddTransient<ProfessoresNegocio>();
builder.Services.AddTransient<ProfessorRepositorio>();

//usuario
builder.Services.AddTransient<UsuarioNegocio>();
builder.Services.AddTransient<UsuarioRepositorio>();

//quiz
builder.Services.AddTransient<QuizNegocio>();
builder.Services.AddTransient<QuizRepositorio>();


builder.Services.AddSingleton<FireBaseComum>();
builder.Services.AddSingleton<IMongoClient>((s) =>
{
    var stringConexaoCosmoDB = Environment.GetEnvironmentVariable("dbConnectionString");
    if (String.IsNullOrWhiteSpace(stringConexaoCosmoDB))
        throw new Exception("Não foi possível identificar a string do conexão com o CosmoDB");

    MongoClientSettings settings = MongoClientSettings.FromUrl(new MongoUrl(stringConexaoCosmoDB));

    settings.SslSettings = new SslSettings() { EnabledSslProtocols = SslProtocols.Tls12 };

    return new MongoClient(settings);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(name: "turma", pattern: "/v1/turma/{action=Index}/{id?}/{id2?}");
app.MapControllerRoute(name: "classificacao", pattern: "/v1/classificacao/{action=Index}/{id?}");
app.MapControllerRoute(name: "livro", pattern: "/v1/livro/{action=Index}/{id?}");
app.MapControllerRoute(name: "instituicao", pattern: "/v1/instituicao/{action=Index}/{id?}");
app.MapControllerRoute(name: "aluno", pattern: "/v1/aluno/{action=Index}/{id?}");
app.MapControllerRoute(name: "pontuacao", pattern: "/v1/pontuacao/{action=Index}/{id?}");
app.MapControllerRoute(name: "aluno", pattern: "/v1/professor/{action=Index}/{id?}");
app.MapControllerRoute(name: "usuario", pattern: "/v1/usuario/{action=Index}/{id?}");
app.MapControllerRoute(name: "quiz", pattern: "/v1/quiz/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();


