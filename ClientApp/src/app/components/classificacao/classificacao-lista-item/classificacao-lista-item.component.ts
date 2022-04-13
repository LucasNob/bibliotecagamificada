import { Component, Input, OnInit } from '@angular/core';
import { Ponto } from 'src/app/models/Ponto.model';

@Component({
  selector: 'app-classificacao-lista-item',
  templateUrl: './classificacao-lista-item.component.html',
  styleUrls: ['./classificacao-lista-item.component.css']
})
export class ClassificacaoListaItemComponent implements OnInit {

  @Input()
  ponto!: Ponto;

  constructor() { }

  ngOnInit(): void {
    
  }

}
