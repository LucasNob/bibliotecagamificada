import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Livro } from 'src/app/models/entidades/Livro.model';

@Component({
  selector: 'app-livro-lista-item',
  templateUrl: './livro-lista-item.component.html',
  styleUrls: ['./livro-lista-item.component.css']
})
export class LivroListaItemComponent implements OnInit {

  constructor() { }

  @Input()
  livro?:Livro;

  @Output()
  excluirEmitter = new EventEmitter<string>();
  
  @Output()
  editarEmitter = new EventEmitter<string>();

  ngOnInit(): void {
  }
  Editar() {
    this.editarEmitter.emit(this.livro?.id);
  }
  Excluir() {
    this.excluirEmitter.emit(this.livro?.id);
  }
}
