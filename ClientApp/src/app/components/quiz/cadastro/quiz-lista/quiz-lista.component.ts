import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Quiz } from 'src/app/models/entidades/Quiz.model';

@Component({
  selector: 'app-quiz-lista',
  templateUrl: './quiz-lista.component.html',
  styleUrls: ['./quiz-lista.component.css']
})
export class QuizListaComponent implements OnInit {
  @Input()
  listaQuiz: Array<Quiz> = [];

  @Output()
  excluirEmitter = new EventEmitter<string>();

  @Output()
  editarEmitter = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  obterLista() {
    if (this.listaQuiz)
      return this.listaQuiz;
    return [];
  }

  Excluir(id: string) {
    this.excluirEmitter.emit(id);
  }

  Editar(id: string) {
    this.editarEmitter.emit(id);
  }

}
