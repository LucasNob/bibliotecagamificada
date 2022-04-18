import { Component, Input, OnInit } from '@angular/core';
import { ItemClassificacao } from 'src/app/models/classificacao/ItemClassificacao.model';
import { Ponto } from 'src/app/models/entidades/Ponto.model';

@Component({
  selector: 'app-classificacao-lista',
  templateUrl: './classificacao-lista.component.html',
  styleUrls: ['./classificacao-lista.component.css']
})
export class ClassificacaoListaComponent implements OnInit {
  
  @Input()
  listaPontos!: Array<Ponto>;

  // listaClassificacao!: Array<ItemClassificacao> ;

  constructor() { }

  ngOnInit(): void {
    // this.listaClassificacao = [];
    // console.log(this.listaPontos);
  }
  obterLista() {
    let listaClassificacao: Array<ItemClassificacao> = [];
    let item = 4;

    if (this.listaPontos.length == 0)
      return listaClassificacao;
    
    this.listaPontos = this.listaPontos.sort((a: Ponto, b: Ponto) => (a.totalPontos <= b.totalPontos) ? 1 : -1);
    
    listaClassificacao.push(
      new ItemClassificacao(
        this.listaPontos[0],
        1,
        "../../../../assets/Ouro.png",
      )
    )
    for (let i = 1; i < this.listaPontos.length; i++){
      if (listaClassificacao[i - 1].ponto.totalPontos == this.listaPontos[i].totalPontos) {
        listaClassificacao.push(
          new ItemClassificacao(
            this.listaPontos[i],
            item-1,
            listaClassificacao[i - 1].premio,
          )
        );
      }
      else if (listaClassificacao[i - 1].premio == "../../../../assets/Ouro.png") {
        listaClassificacao.push(
          new ItemClassificacao(
            this.listaPontos[i],
            i + 1,
            "../../../../assets/Prata.png",
          )
        );
      }
      else if (listaClassificacao[i - 1].premio == "../../../../assets/Prata.png") {
        listaClassificacao.push(
          new ItemClassificacao(
            this.listaPontos[i],
            i + 1,
            "../../../../assets/Bronze.png",
          )
        );
      }
      else{
        listaClassificacao.push(
          new ItemClassificacao(
            this.listaPontos[i],
            item++,
          )
        );
      }
    }
    return listaClassificacao;
  }
}