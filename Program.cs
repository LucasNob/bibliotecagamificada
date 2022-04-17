using System.Security.Authentication;
using BibliotecaGamificada.Classificacao.Negocios;
using BibliotecaGamificada.Comum.Classes.Settings;
using MongoDB.Driver;
using BibliotecaGamificada.Pontos.Comum.Repositorios;
using BibliotecaGamificada.Turma.Negocios;
using BibliotecaGamificada.Turma.Comum.Entidades;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

//classificacao
builder.Services.AddTransient<ClassificacaoNegocio>();
builder.Services.AddTransient<PontoRepositorio>();

//turma
builder.Services.AddTransient<TurmaNegocio>();
builder.Services.AddTransient<TurmaRepositorio>();


//configurar mongo
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDB"));

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

// app.MapControllerRoute(name: "classificacaoController", pattern: "{controller}/{action=Index}/{id?}");
// app.MapControllerRoute(name: "turmaController", pattern: "{controller}/{action=Index}/{id?}");

app.MapControllerRoute(name: "turma", pattern: "/v1/turma/{action=Index}/{id?}");
app.MapControllerRoute(name: "classificacao", pattern: "/v1/classificacao/{action=Index}/{id?}");


app.MapFallbackToFile("index.html"); ;

app.Run();


