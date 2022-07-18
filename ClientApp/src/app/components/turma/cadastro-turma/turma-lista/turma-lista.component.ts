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
  excluirEmitter = new EventEmitter<string>();
  
  @Output()
  editarEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  obterLista() {
    if (this.listaTurma)
      return this.listaTurma;
    return [];
  }
  Excluir(id: string) {
    this.excluirEmitter.emit(id);
  }
  Editar(id: string) {
    this.editarEmitter.emit(id);
  }
}
