import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { Aluno } from 'src/app/models/entidades/Aluno.model';
import { Ponto } from 'src/app/models/entidades/Ponto.model';
import { Turma } from 'src/app/models/entidades/Turma.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { AlunoService } from 'src/app/services/aluno.service';
import { AuthService } from 'src/app/services/auth.service';
import { PontoService } from 'src/app/services/pontos.service';
import { TurmaService } from 'src/app/services/turma.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-marcacao-pagina',
  templateUrl: './marcacao-pagina.component.html',
  styleUrls: ['./marcacao-pagina.component.css']
})
export class MarcacaoPaginaComponent implements OnInit{

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
  @Output()
  emitExclusao = new EventEmitter<any>();

  @ViewChild('modal') modal: any;
  
  constructor(
    private authService: AuthService,
    private turmaService: TurmaService,
    private cdRef: ChangeDetectorRef) { 
  }
  
  ngOnInit(): void {
    this.usuario = this.authService.obterDadosUsuario();    
  }

  obterListaAlunos(): Array<Aluno> {

    let listaA: Array<Aluno> = [];
    let listaP: Array<Ponto> = [];
    if(this.listaAlunos)
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
  emitSelecao(aluno: Aluno) {
    this.alunoAtual = aluno;
    this.modal.mostrarModal(aluno,this.turmaAtual);
  }
  excluirAluno(id: any) {
      this.turmaService.removerAlunoTurma(this.turmaAtual!.id, id);
      this.emitExclusao.emit(id);
  }
  emitSalvar(event:any) { 
    // this.obterAlunosTurma();
    this.emitSalvo.emit(event);
  }
}
