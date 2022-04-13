import { Component, Input, OnInit } from '@angular/core';
import { Ponto } from 'src/app/models/Ponto.model';

@Component({
  selector: 'app-classificacao-lista',
  templateUrl: './classificacao-lista.component.html',
  styleUrls: ['./classificacao-lista.component.css']
})
export class ClassificacaoListaComponent implements OnInit {

  constructor() { }
  
  @Input()
  listaPontos!: Array<Ponto>;

  ngOnInit(): void {
    
  }
}
