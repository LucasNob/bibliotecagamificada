import { HttpClient } from '@angular/common/http';
import { newArray } from '@angular/compiler/src/util';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/models/entidades/Aluno.model';
import { Ponto } from 'src/app/models/entidades/Ponto.model';
import { Turma } from 'src/app/models/entidades/Turma.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { AlunoService } from 'src/app/services/aluno.service';
import { PontoService } from 'src/app/services/pontos.service';
import { TurmaService } from 'src/app/services/turma.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-classificacao-pagina',
  templateUrl: './classificacao-pagina.component.html',
  styleUrls: ['./classificacao-pagina.component.css']
})
export class ClassificacaoPaginaComponent implements OnInit {

  listaTurmas: Array<Turma> = [];
  listaAlunos: Array<Aluno> = [];
  listaPontos = new Array<Ponto>();
  usuario?: Usuario;
  turmaAtual?: Turma;
  idTurma: String = "";

  constructor(
    private usuarioService: UsuarioService,
    private turmaService: TurmaService,
    private pontoService: PontoService,
    private alunoService: AlunoService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      
    this.usuario = usuarioService.obterUsuario(); 
    let url = this.activatedRoute.snapshot.url.join().split(',')
    this.turmaService.obterTurmaPorIdTurma(url[1]).then(data => { 
      this.turmaAtual = data as Turma;
      this.obterClassificacaoTurma();
    })
    
    // this.turmaAtual = history.state.Turma;
  }
  ngOnInit(): void {
  }

  obterClassificacaoTurma() {
    // this.turmaAtual = this.listaTurmas.find(value => value.id == this.idTurma);
    this.pontoService.obterClassificacaoPorIdTurma(this.turmaAtual?.id!).then(data => {
      this.listaPontos = data as Array<Ponto>;
    });
    this.alunoService.ObterListaAlunosPorId(this.turmaAtual?.alunos!).then(data => {
      this.listaAlunos = data as Array<Aluno>;
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

  obterTurmaAtual() {
    return this.turmaAtual;
  }
  checarPermissaoMarcacaoLivro() {
    if (this.usuarioService.ObterNivelPermissao() == 2)
      return true;
    return false;
  }
  navegarMarcacao() {
    this.router.navigateByUrl('/marcacao/'+this.turmaAtual!.id);
  }
}