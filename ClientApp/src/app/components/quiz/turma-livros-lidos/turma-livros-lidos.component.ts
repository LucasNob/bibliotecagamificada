import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Aluno } from 'src/app/models/entidades/Aluno.model';
import { Livro } from 'src/app/models/entidades/Livro.model';
import { Ponto } from 'src/app/models/entidades/Ponto.model';
import { Turma } from 'src/app/models/entidades/Turma.model';
import { LivroService } from 'src/app/services/livro.service';
import { PontoService } from 'src/app/services/pontos.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-turma-livros-lidos',
  templateUrl: './turma-livros-lidos.component.html',
  styleUrls: ['./turma-livros-lidos.component.css']
})
export class TurmaLivroslidosComponent implements OnInit ,OnChanges{

  @Input()
  aluno?: Aluno; 
  @Input()
  turma?: Turma;
  
  listaLivrosLidos = new Array<any>();
  list = new Array<any>();
  ponto?: Ponto;
  constructor(
    private pontoService: PontoService,
    private livroService: LivroService,
    private quizService: QuizService,
    private router: Router,
  private cdRef: ChangeDetectorRef) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.aluno && this.turma) {
      this.pontoService.obterPontoAluno(this.turma.id, this.aluno.id).then(res => {
        this.ponto = res as Ponto;
        this.livroService.obterListaLivros(this.ponto.livrosLidos).then(ret => {
          const livros = ret as Array<Livro>;
          this.listaLivrosLidos = this.obterLista(livros)
        })
      })
    }
  }
  
  ngOnInit(): void {
  }
  
  obterLista(lista:Array<any>): Array<any> {
    if (lista) {
      let listaLivros:Array<any> = [];
      lista.forEach(l => {
        this.quizService.obterQuizPorIdLivro(l.id).then(res => {
          let quiz = res as Array<any>;
          if (quiz != null) {
            if (quiz.length > 0) {
              let t = false; 
              this.ponto?.livrosQuiz.forEach(element => {
                if (element == l.id) {
                  listaLivros.push({ livro: l, mostrarQuiz: false });
                  t = true;
                }
              })
              if (!t) {
                listaLivros.push({ livro: l, mostrarQuiz: true });
              }
            }
          }
          else {
            listaLivros.push({ livro: l, mostrarQuiz: false });
          } 
        })
      })
      return listaLivros;
    }
    return [];
  }

  responderQuizLivro(livro:Livro) {
    this.router.navigate(['respostaquiz'],
      {
        state: {
          ponto: this.ponto,
          aluno: this.aluno,
          livro: livro,
          turma: this.turma,
          return: '/listaclassificacao/' + this.turma?.id
        }
      });
  }
}
