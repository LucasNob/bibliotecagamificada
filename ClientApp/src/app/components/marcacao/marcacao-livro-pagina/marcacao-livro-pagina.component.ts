import { Component, Input, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { PontoAtualizacao } from 'src/app/models/classificacao/PontoAtualizacao.model';
import { Aluno } from 'src/app/models/entidades/Aluno.model';
import { Livro } from 'src/app/models/entidades/Livro.model';
import { Ponto } from 'src/app/models/entidades/Ponto.model';
import { Turma } from 'src/app/models/entidades/Turma.model';
import { LivroService } from 'src/app/services/livro.service';
import { PontoService } from 'src/app/services/pontos.service';

@Component({
  selector: 'app-marcacao-livro-pagina',
  templateUrl: './marcacao-livro-pagina.component.html',
  styleUrls: ['./marcacao-livro-pagina.component.css']
})
export class MarcacaoLivroPaginaComponent implements OnInit {

  constructor(
    private livroService: LivroService,
    private pontoService: PontoService,
    private location: Location) { }

  // @Input()
  aluno?: Aluno;
  
  // @Input()
  turma?: Turma; 

  ponto?: Ponto;
  listaLivros?: Array<Livro>;
  listaLivrosMarcados?: Array<String> = [];

  ngOnInit(): void {
    this.aluno = history.state.Aluno;
    this.turma = history.state.Turma;
    
    if (this.turma?.livros != undefined && this.turma.livros.length > 0)
      this.livroService.obterListaLivros(this.turma!.livros!).then(data => {
        this.listaLivros = data as Array<Livro>;
      });;
    
    this.pontoService.obterPontoAluno(this.turma?.id!, this.aluno?.id!).then(data => { 
      this.ponto = data as Ponto;
      this.ponto.livrosLidos.forEach(p => { 
        this.check(p);
      }
      )
    })
  }
  obterListaLivros() { 
    if (this.listaLivros == undefined)
      return [];
    return this.listaLivros;
  }
  check(id: String) {
    console.log('aqui')
    if (this.listaLivrosMarcados?.find(m => m == id) == undefined)
      this.listaLivrosMarcados?.push(id);
    else {
      let index = this.listaLivrosMarcados.findIndex(m => m == id)
      this.listaLivrosMarcados.splice(index,index);
    }
    console.log(this.listaLivrosMarcados)
  } 
  salvar() { 
    console.log(this.listaLivrosMarcados)
    let atualizacao = new PontoAtualizacao(this.aluno?.id!,this.turma?.id!,this.listaLivrosMarcados!,0)
      this.pontoService.atualizarPontuacao(atualizacao).then(data => {
      this.location.back()
      });
  }
}
