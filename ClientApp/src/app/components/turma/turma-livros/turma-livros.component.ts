import { Component, Input, OnInit } from '@angular/core';
import { Livro } from 'src/app/models/entidades/Livro.model';

@Component({
  selector: 'app-turma-livros',
  templateUrl: './turma-livros.component.html',
  styleUrls: ['./turma-livros.component.css']
})
export class TurmaLivrosComponent implements OnInit {

  @Input()
  listaLivros = new Array<Livro>();

  constructor() { }

  ngOnInit(): void {
  }

  obterLista(): Array<Livro> {
    return this.listaLivros;
  }

  excluirLivro()
  {

  }
}