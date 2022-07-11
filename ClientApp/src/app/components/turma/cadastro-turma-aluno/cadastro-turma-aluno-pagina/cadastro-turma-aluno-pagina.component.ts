import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Aluno } from 'src/app/models/entidades/Aluno.model';
import { Professor } from 'src/app/models/entidades/Professor.model';
import { Turma } from 'src/app/models/entidades/Turma.model';
import { TurmaCadastroModel } from 'src/app/models/entidades/TurmaCadastro.model';
import { AlunoService } from 'src/app/services/aluno.service';
import { TurmaService } from 'src/app/services/turma.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-cadastro-turma-aluno-pagina',
  templateUrl: './cadastro-turma-aluno-pagina.component.html',
  styleUrls: ['./cadastro-turma-aluno-pagina.component.css']
})
export class CadastroTurmaAlunoPaginaComponent implements OnInit {

  usuario: Professor;

  constructor(
    private usuarioService: UsuarioService,
    private turmaService: TurmaService,
    private alunoService: AlunoService,
    private location: Location,
    private activatedRoute: ActivatedRoute) {
    this.usuario = usuarioService.obterUsuario() as Professor;
  }
  
  // @Input()
  turma?: Turma; 

  listaAlunos?: Array<Aluno> = [];
  listaAlunosTurma?: Array<Aluno> = [];
  listaAlunosMarcados?: Array<String> = [];
  listaAlunosMarcadosOriginal?: Array<String> = [];

  carregado = false;

  ngOnInit(): void {
    this.obter();
  }
  obter() { 
    let url = this.activatedRoute.snapshot.url.join().split(',')
    this.turmaService.obterTurmaPorIdTurma(url[1]).then(data => { 
      this.turma = data as Turma;
      if (this.turma == undefined)
        this.location.back()
    
        this.alunoService.ObterAlunosPorInstituicao(this.usuario.instituicao).then(data => {
          
          this.listaAlunos = data as Array<Aluno>;
        if (this.turma?.alunos != undefined && this.turma.alunos.length > 0)
          this.alunoService.ObterListaAlunosPorId(this.turma?.alunos).then(data => {
            this.listaAlunosTurma = data as Array<Aluno>;
            this.listaAlunos?.forEach(aluno => {

              this.listaAlunosTurma!.forEach(element => {
                if (element.id == aluno.id) {
                  // this.listaAlunosTurma?.push(aluno);
                  this.listaAlunosMarcados?.push(aluno.id);
                  this.listaAlunosMarcadosOriginal?.push(aluno.id);
                }
              });
            })
            
            this.listaAlunos = this.listaAlunos?.filter( l => {
              return !this.listaAlunosMarcados!.includes(l.id);
            });
            this.carregado = true;
          })
          else
          this.carregado = true;
      })
    })
  }
  obterListaAlunos() { 
    if (this.listaAlunos == undefined)
      return [];
    return this.listaAlunos;
  }
  obterListaAlunosTurma() {
    if (this.listaAlunosTurma == undefined)
      return [];
    return this.listaAlunosTurma;
  }
  check(id: String) {
    let aluno = this.listaAlunos?.find(l => l.id == id);
    this.listaAlunos?.splice(this.listaAlunos.findIndex(l => l.id == id),1)
    this.listaAlunosTurma?.push(aluno!);
    this.listaAlunosMarcados?.push(aluno!.id);
  } 
  uncheck(id: String) {
    let aluno = this.listaAlunosTurma?.find(l => l.id == id);
    this.listaAlunos?.push(aluno!);
    this.listaAlunosTurma?.splice(this.listaAlunosTurma.findIndex(l => l.id == id),1)
    this.listaAlunosMarcados?.splice(this.listaAlunosMarcados.findIndex(l => l == id),1)
  } 
  salvar() { 
    let turma = new TurmaCadastroModel(this.turma!.nome, this.turma?.anoLetivo!, this.turma?.instituicao!, this.usuario.id)
    turma.id = this.turma?.id;
    turma.alunos = this.listaAlunosMarcados!;
    
    this.turmaService.atualizarAlunosTurma(turma).then(() => { 
      this.obter();
    });
    // this.turmaService.atualizarAlunosTurma(turma).then(data => { 
    //   //?
    // })
  }
  mostrarBotaoVoltar(id: String) {
    if (this.listaAlunosMarcadosOriginal?.includes(id))
      return false;
      return true;
  }
}  