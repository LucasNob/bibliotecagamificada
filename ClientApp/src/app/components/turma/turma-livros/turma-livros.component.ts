import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Livro } from 'src/app/models/entidades/Livro.model';
import { Turma } from 'src/app/models/entidades/Turma.model';
import { LivroService } from 'src/app/services/livro.service';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-turma-livros',
  templateUrl: './turma-livros.component.html',
  styleUrls: ['./turma-livros.component.css']
})
export class TurmaLivrosComponent implements OnInit {

  @Input()
  listaLivros = new Array<Livro>();
  
  @Input()
  turma?: Turma;
  
  @ViewChild('content')
  contentModal: any;

  @Output()
  emitExcluirLivro = new EventEmitter<any>();
  
  livroSelecionado?: Livro;
  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  obterLista(): Array<Livro> {
    if (this.listaLivros)
      return this.listaLivros;
    return [];
  }

  excluirLivro(id:string){
    this.emitExcluirLivro.emit(id);
    this.modalService.dismissAll();
  }
  esconderModal() {
    this.modalService.dismissAll();
  }
  selecionarLivro(livro:Livro) { 
    this.livroSelecionado = livro;
    const opcoes: NgbModalOptions = {
      windowClass: "custom-modal"
    };
    
    this.modalService.open(this.contentModal, opcoes)
  }
}