using System.Text.RegularExpressions;
using Azure.Storage.Blobs;
/// <summary>
/// Upload de arquivos para blob storage do azure
/// </summary>
class AzureBlobStorage
{
    private string? stringConexaoBlobStorage;
    public AzureBlobStorage()
    {
        this.stringConexaoBlobStorage = Environment.GetEnvironmentVariable("blobStorageConnectionString");

        if (String.IsNullOrWhiteSpace(stringConexaoBlobStorage))
            throw new Exception("Não foi possível identificar a string do conexão com o BlobStorage");
    }
    /// <summary>
    /// Upload de imagem
    /// </summary>
    /// <returns>Nome do arquivo</returns>
    /// <src>https://balta.io/blog/upload-imagem-azure-storage-csharp</src>
    public async Task<string> UploadImagem(string ImagemBase64, string conteiner)
    {
        // Gera um nome randomico para imagem
        var nomeArquivo = Guid.NewGuid().ToString() + ".jpg";

        // Limpa o hash enviado
        var data = new Regex(@"^data:image\/[a-z]+;base64,").Replace(ImagemBase64, "");

        // Gera um array de Bytes
        byte[] imageBytes = Convert.FromBase64String(data);

        // Define o BLOB no qual a imagem será armazenada
        var blobClient = new BlobClient(stringConexaoBlobStorage, conteiner, nomeArquivo);

        // Envia a imagem
        using (var stream = new MemoryStream(imageBytes))
        {
            await blobClient.UploadAsync(stream);
        }

        // Retorna a URL da imagem
        return blobClient.Uri.AbsoluteUri;
    }
}