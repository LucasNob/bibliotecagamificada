import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Turma } from 'src/app/models/entidades/Turma.model';

@Component({
  selector: 'app-turma-lista',
  templateUrl: './turma-lista.component.html',
  styleUrls: ['./turma-lista.component.css']
})
export class TurmaListaComponent implements OnInit {
  
  @Input()
  listaTurma: Array<Turma> = [];

  @Output()
  excluirEmitter = new EventEmitter<String>();
  
  @Output()
  editarEmitter = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }
  obterLista() {
    if (this.listaTurma)
      return this.listaTurma;
    return [];
  }
  Excluir(id: String) {
    this.excluirEmitter.emit(id);
  }
  Editar(id: String) {
    this.editarEmitter.emit(id);
  }
}
