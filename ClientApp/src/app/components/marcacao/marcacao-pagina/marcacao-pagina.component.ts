import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-marcacao-pagina',
  templateUrl: './marcacao-pagina.component.html',
  styleUrls: ['./marcacao-pagina.component.css']
})
export class MarcacaoPaginaComponent implements OnInit, OnChanges{

  // listaTurmas: Array<Turma> = [];

  listaAlunos = new Array<Aluno>();
  listaPontos = new Array<Ponto>();

  usuario?: Usuario;
  alunoAtual?: Aluno;

  @Input()
  turmaAtual?: Turma;

  @ViewChild('modal') modal: any;
  
  constructor(
    private usuarioService: UsuarioService,
    private alunoService: AlunoService,
    private pontoService: PontoService) { 
  }
  
  ngOnInit(): void {
    this.usuario = this.usuarioService.obterUsuario();    
  }

  ngOnChanges() {
    if (this.turmaAtual?.id) { 
      this.obterAlunosTurma();
    }
  }
  obterListaAlunos(): Array<Aluno> {
    if (this.listaAlunos == undefined)
      return [];
    return this.listaAlunos;
  }
  obterTurmaAtual() {
    return this.turmaAtual;
  } 
  obterAlunoAtual() {
    return this.alunoAtual;
  } 
  obterListaPonto() { 
    return this.listaPontos;
  }
  obterAlunosTurma() {
    this.alunoService.ObterListaAlunosPorId(this.turmaAtual!.alunos).then(data => {
      this.listaAlunos = data as Array<Aluno>;
    });;
    this.pontoService.obterClassificacaoPorIdTurma(this.turmaAtual!.id).then(data => {
      this.listaPontos = data as Array<Ponto>;
    });;
  }
  emitSelecao(aluno: Aluno) {
    this.alunoAtual = aluno;
    this.modal.mostrarModal(aluno,this.turmaAtual);
  }
}
