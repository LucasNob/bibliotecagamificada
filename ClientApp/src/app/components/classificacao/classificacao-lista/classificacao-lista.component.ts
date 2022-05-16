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
    // this.listaClassificacao = [];
    console.log(this.listaAlunos);
  }
  obterLista() {
    let listaClassificacao = new Array<ItemClassificacao>();
    let item = 4;
      
    if (this.listaPontos.length == 0 || this.listaAlunos.length == 0 )
      return listaClassificacao;
    
    this.listaPontos = this.listaPontos.sort((a: Ponto, b: Ponto) => (a.totalPontos <= b.totalPontos) ? 1 : -1);
    let a = this.listaAlunos.find(a => a.id == this.listaPontos[0].aluno);

    if (a == undefined)
      return listaClassificacao;
    
    listaClassificacao.push(
      new ItemClassificacao(
        this.listaPontos[0],
        1,
        a.nome,
        a.foto,
        "../../../../assets/images/Ouro.png",
      )
    )
    
    for (let i = 1; i < this.listaPontos.length; i++){

      let aluno = this.listaAlunos.find(a => a.id == this.listaPontos[i].aluno);

      if (listaClassificacao[i - 1].ponto.totalPontos == this.listaPontos[i].totalPontos) {
        listaClassificacao.push(
          new ItemClassificacao(
            this.listaPontos[i],
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
            this.listaPontos[i],
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
            this.listaPontos[i],
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
            this.listaPontos[i],
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