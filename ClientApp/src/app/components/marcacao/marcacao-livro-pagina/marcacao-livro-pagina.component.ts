import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
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
    private modalService: NgbModal) { }

  @Input()
  aluno?: Aluno;
  
  @Input()
  turma?: Turma; 

  @Output()
  emitSalvar = new EventEmitter<any>();
  
  @ViewChild('content')
  contentModal: any;


  ponto?: Ponto;
  listaLivros?: Array<Livro> = [];
  listaLivrosLidos?: Array<Livro> = [];
  listaLivrosMarcados?: Array<String> = [];
  listaLivrosMarcadosOriginal?: Array<String> = [];

  carregado = false;

  ngOnInit(): void {
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
  uncheck(id: String) {
    let livro = this.listaLivrosLidos?.find(l => l.id == id);
    this.listaLivros?.push(livro!);
    this.listaLivrosLidos?.splice(this.listaLivrosLidos.findIndex(l => l.id == id),1)
    this.listaLivrosMarcados?.splice(this.listaLivrosMarcados.findIndex(l => l == id),1)
  } 
  salvar() {
    let atualizacao = new PontoAtualizacao(this.aluno?.id!,this.turma?.id!,this.listaLivrosMarcados!,0)
      this.pontoService.atualizarPontuacao(atualizacao).then(data => {
        // this.location.back()
        this.emitSalvar.emit(data);
        this.modalService.dismissAll();
      });
  }
  mostrarModal(aluno: any, turma: any) {
    
    const opcoes: NgbModalOptions = {
      // backdrop: 'static',
      // keyboard: false,
      // size: 'lg',
      windowClass: "custom-modal"
    };
    this.carregado = false;
    this.listaLivros = new Array<Livro>();
    this.listaLivrosLidos = new Array<Livro>();
    this.listaLivrosMarcados = new Array<String>();
    this.listaLivrosMarcadosOriginal = new Array<String>();
    this.aluno = aluno;
    this.turma = turma;

    if (this.turma?.livros != undefined && this.turma.livros.length > 0)
    this.livroService.obterListaLivros(this.turma!.livros!).then(data => {
      this.listaLivros = data as Array<Livro>;
      
      this.pontoService.obterPontoAluno(this.turma?.id!, this.aluno?.id!).then(data => {
        let ponto = data as Ponto;
        this.listaLivros?.forEach(livro => {
          if (ponto.livrosLidos.includes(livro.id)) { 
            this.listaLivrosLidos?.push(livro);
            this.listaLivrosMarcados?.push(livro.id);
            this.listaLivrosMarcadosOriginal?.push(livro.id);
          }
        })
        this.listaLivros = this.listaLivros?.filter( l => {
          return !this.listaLivrosMarcados!.includes(l.id);
        } );
        this.carregado = true;
        })
    })

    this.modalService.open(this.contentModal, opcoes)
  }
  mostrarBotaoVoltar(id: String) {
    if (this.listaLivrosMarcadosOriginal?.includes(id))
      return false;
    return true;
  }
}
