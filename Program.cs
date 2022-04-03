using System.Security.Authentication;
using BibliotecaGamificada.Classificacao.Api.Repositorios;
using BibliotecaGamificada.Classificacao.Negocios;
using BibliotecaGamificada.Comum.Classes.Settings;
using MongoDB.Driver;






var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddTransient<ClassificacaoNegocio>();
builder.Services.AddTransient<ClassificacaoRepositorio>();

builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDB"));

//configurar mongo
builder.Services.AddSingleton<IMongoClient>((s) =>{
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

app.MapControllerRoute(name: "default", pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

app.Run();

  
