using BibliotecaGamificada.Comum.Classes.Models;
using BibliotecaGamificada.Alunos.Comum.Repositorios;
using Microsoft.AspNetCore.Mvc;
using BibliotecaGamificada.Alunos.Api.Models;
using BibliotecaGamificada.Livros.Comum.Entidades;
using BibliotecaGamificada.Pontos.Comum.Repositorios;
using BibliotecaGamificada.Turmas.Comum.Repositorios;

namespace BibliotecaGamificada.Alunos.Negocios
{
    public class AlunosNegocio
    {
        private readonly AlunoRepositorio alunoRepositorio;
        private readonly PontoRepositorio pontoRepositorio;
        private readonly TurmaRepositorio turmaRepositorio;

        public AlunosNegocio(AlunoRepositorio alunoRepositorio, PontoRepositorio pontoRepositorio, TurmaRepositorio turmaRepositorio)
        {
            this.alunoRepositorio = alunoRepositorio;
            this.pontoRepositorio = pontoRepositorio;
            this.turmaRepositorio = turmaRepositorio;
        }

        public async Task<IActionResult> Obter()
        {
            RetornoMsg msg;
            var alunos = await alunoRepositorio.Obter();
            if (alunos == null || alunos.Count == 0)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", alunos);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> ObterAlunoPorId(string id)
        {
            RetornoMsg msg;
            var alunos = await alunoRepositorio.ObterPorId(id);
            if (alunos == null)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", alunos);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> ObterAlunoporInstituicao(string id)
        {
            RetornoMsg msg;
            var alunos = await alunoRepositorio.ObterPorInstituicao(id);
            if (alunos == null)
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", alunos);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> ObterAlunosPorLista(List<string> id)
        {
            RetornoMsg msg;
            var alunos = await alunoRepositorio.ObterPorLista(id);
            if (alunos == null || alunos.Count == 0 )
                msg = new RetornoMsg("erro", "Registros não encontrados");
            else
                msg = new RetornoMsg("sucesso", "retorno enviado", alunos);

            return new OkObjectResult(msg);
        }

        public async Task<IActionResult> CadastrarAluno(AlunoCadastroModel aluno)
        {
            string foto = "../../../assets/images/default_avatar.png";
            try
            {
                var bs = new AzureBlobStorage();

                if (aluno.foto != foto)
                {
                    foto = await bs.UploadImagem(aluno.foto!, "imagens");
                }

                var a = new Aluno(aluno.dataNascimento, aluno.instituicao, aluno.senha, aluno.nome, aluno.email, foto, aluno.permissao);

                await alunoRepositorio.Cadastrar(a);
            }
            catch (Exception e)
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao cadastrar", e));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Aluno Registrado"));
        }

        public async Task<IActionResult> ExcluirAluno(string id)
        {
            try
            {
                await alunoRepositorio.Excluir(id);
                await pontoRepositorio.ExcluirporAluno(id);
                await turmaRepositorio.RemoverAluno(id);
            }
            catch
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao exluir"));
            }

            return new OkObjectResult(new RetornoMsg("sucesso", "Aluno Excluido"));
        }

        public async Task<IActionResult> EditarAluno(AlunoCadastroModel aluno)
        {
            string foto = "../../../assets/images/default_avatar.png";
            try
            {
                var alunoAnterior = await alunoRepositorio.ObterPorId(aluno.id!);
                
                var bs = new AzureBlobStorage();

                if (aluno.foto != foto && aluno.foto != alunoAnterior.foto)
                {
                    foto = await bs.UploadImagem(aluno.foto!, "imagens");
                }
                else {
                    foto = aluno.foto!;
                }

                var a = new Aluno(aluno.dataNascimento, aluno.instituicao, aluno.senha, aluno.nome, aluno.email, foto, aluno.permissao);
                a.Id = aluno.id;
                await alunoRepositorio.Editar(a);
            }
            catch
            {
                return new OkObjectResult(new RetornoMsg("erro", "Erro ao editar"));
            }
            return new OkObjectResult(new RetornoMsg("sucesso", "Aluno editado"));
        }

      
    }
}