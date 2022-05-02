import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Livro } from 'src/app/models/entidades/Livro.model';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
  
  @Input()
  listaLivros: Array<Livro> = [];

  @Output()
  excluirEmitter = new EventEmitter<String>();
  
  @Output()
  editarEmitter = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }
  obterLista() {
    return this.listaLivros;
  }
  emitExcluir(id: String) {
    this.excluirEmitter.emit(id);
  }
  emitEditar(id: String) {
    this.editarEmitter.emit(id);
  }
}
