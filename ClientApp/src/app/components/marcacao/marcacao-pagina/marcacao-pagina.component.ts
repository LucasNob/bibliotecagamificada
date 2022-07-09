import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { Aluno } from 'src/app/models/entidades/Aluno.model';
import { Ponto } from 'src/app/models/entidades/Ponto.model';
import { Turma } from 'src/app/models/entidades/Turma.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { AlunoService } from 'src/app/services/aluno.service';
import { PontoService } from 'src/app/services/pontos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-marcacao-pagina',
  templateUrl: './marcacao-pagina.component.html',
  styleUrls: ['./marcacao-pagina.component.css']
})
export class MarcacaoPaginaComponent implements OnInit, OnChanges{

  // listaTurmas: Array<Turma> = [];
  @Input()
  listaAlunos = new Array<Aluno>();
  @Input()
  listaPontos = new Array<Ponto>();

  usuario?: Usuario;
  alunoAtual?: Aluno;

  @Input()
  turmaAtual?: Turma;

  @Output()
  emitSalvo = new EventEmitter<any>();

  @ViewChild('modal') modal: any;
  
  constructor(
    private usuarioService: UsuarioService,
    private cdRef: ChangeDetectorRef) { 
  }
  
  ngOnInit(): void {
    this.usuario = this.usuarioService.obterUsuario();    
  }

  ngOnChanges() {
    // this.cdRef.detectChanges();
  }

  obterListaAlunos(): Array<Aluno> {

    let listaA: Array<Aluno> = [];
    let listaP: Array<Ponto> = [];

    this.listaAlunos.forEach((aluno) => {
      let p = this.listaPontos.find(p => p.aluno == aluno.id);
      if (p != undefined) {
        listaA.push(aluno);
        listaP.push(p);
      }
    })

    let a = listaA.find(a => a.id == listaP[0].aluno);

    if (listaA == undefined || listaA.length == 0)
      return [];
    
    if (a == undefined)
      return [];

    this.listaAlunos = listaA;
    this.listaPontos = listaP;
    
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
  // obterAlunosTurma() {
  //   this.alunoService.ObterListaAlunosPorId(this.turmaAtual!.alunos).then(data => {
  //     this.listaAlunos = data as Array<Aluno>;
  //   });;
  //   this.pontoService.obterClassificacaoPorIdTurma(this.turmaAtual!.id).then(data => {
  //     this.listaPontos = data as Array<Ponto>;
  //   });;
  // }
  emitSelecao(aluno: Aluno) {
    this.alunoAtual = aluno;
    this.modal.mostrarModal(aluno,this.turmaAtual);
  }
  emitSalvar(event:any) { 
    // this.obterAlunosTurma();
    this.emitSalvo.emit(event);
  }
}
