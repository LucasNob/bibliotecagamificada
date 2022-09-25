import { Component, Input, OnInit } from '@angular/core';
import { ItemClassificacao } from 'src/app/models/classificacao/ItemClassificacao.model';
import { Aluno } from 'src/app/models/entidades/Aluno.model';
import { Ponto } from 'src/app/models/entidades/Ponto.model';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-classificacao-lista',
  templateUrl: './classificacao-lista.component.html',
  styleUrls: ['./classificacao-lista.component.css']
})
export class ClassificacaoListaComponent implements OnInit {
  
  @Input()
  listaPontos!: Array<Ponto>;
  @Input()
  listaAlunos!: Array<Aluno>;

  // listaClassificacao!: Array<ItemClassificacao> ;

  constructor( private alunoServie:AlunoService) { }

  ngOnInit(): void {
  }

  obterLista() {
    let listaClassificacao = new Array<ItemClassificacao>();
    let item = 4;
    
    if (this.listaPontos.length == 0 || this.listaAlunos.length == 0)
      return listaClassificacao;
    
    this.listaPontos = this.listaPontos.sort((a: Ponto, b: Ponto) => (a.totalPontos <= b.totalPontos) ? 1 : -1);
    
    let listaA: Array<Aluno> = [];
    let listaP: Array<Ponto> = [];
    
    this.listaPontos.forEach((ponto) => {
      let a = this.listaAlunos.find(p => p.id == ponto.aluno);
      if (a != undefined) {
        listaA.push(a);
        listaP.push(ponto);
      }
    });
    
    let a = listaA.find(a => a.id == listaP[0].aluno);

    if (listaA == undefined || listaA.length == 0)
      return listaClassificacao;
    
    if (a == undefined)
      return listaClassificacao;
    
    listaClassificacao.push(
      new ItemClassificacao(
        listaP[0],
        1,
        a.nome,
        a.foto,
        "../../../../assets/images/Ouro.png",
      )
    )
    
    for (let i = 1; i < listaP.length; i++){

      let aluno = listaA.find(a => a.id == listaP[i].aluno);

      if (listaClassificacao[i - 1].ponto.totalPontos == listaP[i].totalPontos) {
        listaClassificacao.push(
          new ItemClassificacao(
            listaP[i],
            item - 1,
            aluno?.nome!,
            aluno?.foto,
            listaClassificacao[i - 1].premio,
          )
        );
      }
      else if (listaClassificacao[i - 1].premio == "../../../../assets/images/Ouro.png") {
        listaClassificacao.push(
          new ItemClassificacao(
            listaP[i],
            i + 1,
            aluno?.nome!,
            aluno?.foto,
            "../../../../assets/images/Prata.png",
          )
        );
      }
      else if (listaClassificacao[i - 1].premio == "../../../../assets/images/Prata.png") {
        listaClassificacao.push(
          new ItemClassificacao(
            listaP[i],
            i + 1,
            aluno?.nome!,
            aluno?.foto,
            "../../../../assets/images/Bronze.png",
          )
        );
      }
      else{
        listaClassificacao.push(
          new ItemClassificacao(
            listaP[i],
            item++,
            aluno?.nome!,
            aluno?.foto,
          )
        );
      }
    }
    return listaClassificacao;
  }
}