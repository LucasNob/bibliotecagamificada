import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
export class MarcacaoPaginaComponent implements OnInit {

  // listaTurmas: Array<Turma> = [];
  listaAlunos = new Array<Aluno>();
  listaPontos = new Array<Ponto>();

  usuario?: Usuario;
  turmaAtual?: Turma;
  alunoAtual?: Aluno;
  
  constructor(
    private turmaService: TurmaService,
    private usuarioService: UsuarioService,
    private alunoService: AlunoService,
    private pontoService: PontoService,
    private router: Router
  ) { 
    // this.usuarioService.usuario = new Usuario("idaluno1", "Lucas Vinicius");
    this.usuario = usuarioService.obterUsuario(); 
    this.turmaAtual = history.state.Turma;
    
    // turmaService.obterTurmasPorIdProfessor(this.usuario!.id).then(data => {
    //   this.listaTurmas = data as Array<Turma>;
    // });
    this.obterAlunosTurma();
  }

  ngOnInit(): void {

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
    this.router.navigateByUrl('/marcacaoLivro', { state: { Aluno: aluno, Turma: this.turmaAtual } });
  }
}
