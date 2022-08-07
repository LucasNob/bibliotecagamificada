import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Professor } from 'src/app/models/entidades/Professor.model';
import { Aluno } from 'src/app/models/entidades/Aluno.model';

@Component({
  selector: 'app-aluno-lista',
  templateUrl: './aluno-lista.component.html',
  styleUrls: ['./aluno-lista.component.css']
})
export class AlunoListaComponent implements OnInit {
  
  @Input()
  listaAluno: Array<Aluno> = [];

  @Output()
  excluirEmitter = new EventEmitter<string>();
  
  @Output()
  editarEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  obterLista() {
    if (this.listaAluno)
      return this.listaAluno;
    return [];
  }
  Excluir(id: string) {
    this.excluirEmitter.emit(id);
  }
  Editar(id: string) {
    this.editarEmitter.emit(id);
  }
}
