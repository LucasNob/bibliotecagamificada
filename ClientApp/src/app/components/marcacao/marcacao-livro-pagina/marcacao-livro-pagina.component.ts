import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  listaLivros?: Array<Livro> = [];
  listaLivrosLidos?: Array<Livro> = [];
  listaLivrosMarcados?: Array<String> = [];

  carregado = false;

  ngOnInit(): void {
    this.aluno = history.state.Aluno;
    this.turma = history.state.Turma;

    if (this.aluno == undefined || this.turma == undefined)
      this.location.back()
    
    if (this.turma?.livros != undefined && this.turma.livros.length > 0)
    this.livroService.obterListaLivros(this.turma!.livros!).then(data => {
      this.listaLivros = data as Array<Livro>;
      
      this.pontoService.obterPontoAluno(this.turma?.id!, this.aluno?.id!).then(data => {
        let ponto = data as Ponto;
        this.listaLivros?.forEach(livro => {
          if (ponto.livrosLidos.includes(livro.id)) { 
            this.listaLivrosLidos?.push(livro);
            this.listaLivrosMarcados?.push(livro.id);
          }
        })
        this.listaLivros = this.listaLivros?.filter( l => {
          return !this.listaLivrosMarcados!.includes(l.id);
        } );
        this.carregado = true;
        })
    })
  }
  obterListaLivros() { 
    if (this.listaLivros == undefined)
      return [];
    return this.listaLivros;
  }
  obterListaLivrosLidos() { 
    if (this.listaLivrosLidos == undefined)
      return [];
    return this.listaLivrosLidos;
  }
  check(id: String) {
    let livro = this.listaLivros?.find(l => l.id == id);
    this.listaLivros?.splice(this.listaLivros.findIndex(l => l.id == id),1)
    this.listaLivrosLidos?.push(livro!);
    this.listaLivrosMarcados?.push(livro!.id);
  } 
  salvar() { 
    console.log(this.listaLivrosMarcados!)
    let atualizacao = new PontoAtualizacao(this.aluno?.id!,this.turma?.id!,this.listaLivrosMarcados!,0)
      this.pontoService.atualizarPontuacao(atualizacao).then(data => {
        this.location.back()
      });
  }
}
