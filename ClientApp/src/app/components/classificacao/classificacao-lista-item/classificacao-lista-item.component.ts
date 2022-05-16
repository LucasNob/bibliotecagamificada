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
  premio?:String;
  @Input()
  colocacao!: number;
  @Input()
  img!: String;
  @Input()
  nome!: String;

  constructor() { }

  ngOnInit(): void {
    
  }

}
