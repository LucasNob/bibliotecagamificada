import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/app/models/entidades/Livro.model';

@Component({
  selector: 'app-turma-livroslidos',
  templateUrl: './turma-livroslidos.component.html',
  styleUrls: ['./turma-livroslidos.component.css']
})
export class TurmaLivroslidosComponent implements OnInit {

  listaLivrosLidos = new Array<Livro>();

  constructor() { }

  ngOnInit(): void {
  }

  obterLista(): Array<Livro> {
    if (this.listaLivrosLidos)
      return this.listaLivrosLidos;
    return [];
  }

  responderQuizLivro() {

  }

}
