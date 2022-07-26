import { Component, Input, OnInit } from '@angular/core';
import { Aluno } from 'src/app/models/entidades/Aluno.model';
import { Ponto } from 'src/app/models/entidades/Ponto.model';

@Component({
  selector: 'app-classificacao-lista-item',
  templateUrl: './classificacao-lista-item.component.html',
  styleUrls: ['./classificacao-lista-item.component.css']
})
export class ClassificacaoListaItemComponent implements OnInit {

  @Input()
  ponto!: Ponto;
  @Input()
  premio?:string;
  @Input()
  colocacao!: number;
  @Input()
  img!: string;
  @Input()
  nome!: string;

  constructor() { }

  ngOnInit(): void {
    
  }

}
