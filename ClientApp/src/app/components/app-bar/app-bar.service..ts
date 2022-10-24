import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppBarService {


  public mostrar: boolean = true;
  private itens: Array<Link>;
  itensChange: Subject<Array<Link>> = new Subject<Array<Link>>();

  constructor() {
    this.itens = [];
  }
  adicionarLinks(nome: string, link: string) {
    this.itens.push(new Link(nome, link));
    this.itensChange.next(this.itens);
  }
  obterLinks() {
    return this.itens;
  }
  limparLinks() {
    this.itens = [];
  };
}
class Link {
  nome: string;
  link: string;

  constructor(nome: string, link: string) {
    this.nome = nome;
    this.link = link;
  }
}