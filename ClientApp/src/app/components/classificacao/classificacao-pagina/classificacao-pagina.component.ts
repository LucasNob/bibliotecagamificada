import { HttpClient } from '@angular/common/http';
import { newArray } from '@angular/compiler/src/util';
import { ChangeDetectorRef, Component, Inject, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/models/entidades/Aluno.model';
import { Livro } from 'src/app/models/entidades/Livro.model';
import { Ponto } from 'src/app/models/entidades/Ponto.model';
import { Turma } from 'src/app/models/entidades/Turma.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { AlunoService } from 'src/app/services/aluno.service';
import { AuthService } from 'src/app/services/auth.service';
import { LivroService } from 'src/app/services/livro.service';
import { PontoService } from 'src/app/services/pontos.service';
import { TurmaService } from 'src/app/services/turma.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AppBarService } from '../../app-bar/app-bar.service.';

@Component({
  selector: 'app-classificacao-pagina',
  templateUrl: './classificacao-pagina.component.html',
  styleUrls: ['./classificacao-pagina.component.css']
})
export class ClassificacaoPaginaComponent implements OnInit{

  listaTurmas: Array<Turma> = [];
  listaAlunos: Array<Aluno> = [];
  listaLivros: Array<Livro> = [];
  listaPontos = new Array<Ponto>();
  usuario?: Usuario;
  turmaAtual?: Turma;
  idTurma: string = "";

  constructor(
    private turmaService: TurmaService,
    private pontoService: PontoService,
    private alunoService: AlunoService,
    private livroService: LivroService,
    private appbarService:AppBarService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.usuario = this.authService.obterDadosUsuario(); 
    let url = this.activatedRoute.snapshot.url.join().split(',')
    this.turmaService.obterTurmaPorIdTurma(url[1]).then(data => { 
      this.turmaAtual = data as Turma;
      this.obterClassificacaoTurma();
      
      if (this.usuario?.permissao == 1 || this.usuario?.permissao == 2) {
        this.livroService.obterListaLivros(this.turmaAtual?.livros!).then(data => {
          this.listaLivros = data as Array<Livro>;
          this.cdRef.detectChanges();
        });
        this.iniciarAppbar();
      }
    })
  }

  iniciarAppbar() { 
    this.appbarService.limparLinks();
    this.appbarService.adicionarLinks('Cadastrar turmas', 'cadastroturma');
    if (this.usuario?.permissao == 1)
    {
      this.appbarService.adicionarLinks('Cadastrar livros', 'cadastrolivro');
      this.appbarService.adicionarLinks('Cadastrar alunos', 'cadastroaluno');
    }
    this.appbarService.adicionarLinks('Adicionar alunos', 'cadastroturmaaluno/'+this.turmaAtual?.id);
    this.appbarService.adicionarLinks('Adicionar livros', 'cadastroturmalivro/'+this.turmaAtual?.id);
  }

  obterClassificacaoTurma() {
    this.pontoService.obterClassificacaoPorIdTurma(this.turmaAtual?.id!).then(data => {
      this.listaPontos = data as Array<Ponto>;
      this.cdRef.detectChanges();
    }).then(()=>{
      this.alunoService.ObterListaAlunosPorId(this.turmaAtual?.alunos!).then(data => {
        this.listaAlunos = data as Array<Aluno>;
        this.cdRef.detectChanges();
      }).then(()=>{
        if (this.turmaAtual?.id) 
          if (this.usuario?.permissao == 1 || this.usuario?.permissao == 2) {
            this.livroService.obterListaLivros(this.turmaAtual?.livros!).then(data => {
              this.listaLivros = data as Array<Livro>;
              this.cdRef.detectChanges();
            });
          }
      });
    });
  }

  obterListaAlunos(): Array<Aluno> { 
    if (this.listaAlunos == undefined)
      return new Array<Aluno>();
    return this.listaAlunos;
  }
  
  obterListaPontos(): Array<Ponto> {
    if (this.listaPontos == undefined)
      return new Array<Ponto>();
    return this.listaPontos;
  }

  obterListaLivros(): Array<Livro> { 
    if (this.listaLivros == undefined)
      return new Array<Livro>();
    return this.listaLivros;
  }

  excluirLivro(id:any) { 
    this.turmaService.removerLivroTurma(this.turmaAtual!.id, id);
    this.turmaAtual?.livros?.splice(this.turmaAtual.livros.findIndex(l => l == id),1)
    this.obterClassificacaoTurma();
  }
  excluirAluno(id: any) {
    this.turmaAtual?.alunos?.splice(this.turmaAtual.alunos.findIndex(a => a == id),1)
    this.obterClassificacaoTurma();
  }

  obterTurmaAtual() {
    return this.turmaAtual;
  }
  
  checarPermissaoMarcacaoLivro() {
  if (this.usuario?.permissao == 1 || this.usuario?.permissao == 2)
      return true;
    return false;
  }
}