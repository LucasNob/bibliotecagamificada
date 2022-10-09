import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Aluno } from 'src/app/models/entidades/Aluno.model';
import { Livro } from 'src/app/models/entidades/Livro.model';
import { Ponto } from 'src/app/models/entidades/Ponto.model';
import { Turma } from 'src/app/models/entidades/Turma.model';
import { LivroService } from 'src/app/services/livro.service';
import { PontoService } from 'src/app/services/pontos.service';

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
  
  listaLivrosLidos = new Array<Livro>();
  ponto?: Ponto;
  constructor(
    private pontoService: PontoService,
    private livroService: LivroService,
    private router: Router) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.aluno && this.turma) {
      this.pontoService.obterPontoAluno(this.turma.id, this.aluno.id).then(res => {
        this.ponto = res as Ponto;
        this.livroService.obterListaLivros(this.ponto.livrosLidos).then(ret => {
          const livros = ret as Array<Livro>;
          this.listaLivrosLidos = livros;
        })
        console.log(res)
      })
    }
  }

  ngOnInit(): void {
  }

  obterLista(): Array<Livro> {
    console.log(this.listaLivrosLidos)
    console.log(this.ponto?.livrosQuiz)
    if (this.listaLivrosLidos)
      this.ponto?.livrosQuiz.forEach(e => {
        const index = this.listaLivrosLidos.findIndex(element => element.id == e);
        if (index > -1) {
          this.listaLivrosLidos.splice(index,1)
        }
      })
      return this.listaLivrosLidos;
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
