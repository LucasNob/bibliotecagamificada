import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Professor } from 'src/app/models/entidades/Professor.model';

@Component({
  selector: 'app-professor-lista',
  templateUrl: './professor-lista.component.html',
  styleUrls: ['./professor-lista.component.css']
})
export class ProfessorListaComponent implements OnInit {

  @Input()
  listaProfessor: Array<Professor> = [];

  @Output()
  excluirEmitter = new EventEmitter<string>();
  
  @Output()
  editarEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  obterLista() {
    if (this.listaProfessor)
      return this.listaProfessor;
    return [];
  }
  Excluir(id: string) {
    this.excluirEmitter.emit(id);
  }
  Editar(id: string) {
    this.editarEmitter.emit(id);
  }

}
