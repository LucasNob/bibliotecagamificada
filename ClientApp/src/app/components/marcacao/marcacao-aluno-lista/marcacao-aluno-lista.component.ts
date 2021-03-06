import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Aluno } from 'src/app/models/entidades/Aluno.model';
import { Ponto } from 'src/app/models/entidades/Ponto.model';

@Component({
  selector: 'app-marcacao-aluno-lista',
  templateUrl: './marcacao-aluno-lista.component.html',
  styleUrls: ['./marcacao-aluno-lista.component.css']
})
export class MarcacaoAlunoListaComponent implements OnInit {

  @Input()
  listaAlunos = new Array<Aluno>();
  @Input()
  listaPonto = new Array<Ponto>();

  @ViewChild('content')
  contentModal: any;

  @Output()
  selecaoEmitter = new EventEmitter<Aluno>();
  @Output()
  excluirEmitter = new EventEmitter<string>();

  alunoSelecionado?: Aluno;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  obterLista(): Array<Aluno> {
    return this.listaAlunos;
  }
  selecionarAluno(aluno: Aluno) {
    this.selecaoEmitter.emit(aluno);
  }
  obterPontuacaoAluno(aluno: Aluno) {
    return this.listaPonto.find(m => m.aluno == aluno.id)?.livrosLidos.length;
  }
  excluirAluno(id:string){
    this.excluirEmitter.emit(id);
    this.modalService.dismissAll();
  }
  esconderModal() {
    this.modalService.dismissAll();
  }
  selecionarAlunoExcluir(aluno:Aluno) { 
    this.alunoSelecionado = aluno;
    const opcoes: NgbModalOptions = {
      windowClass: "custom-modal"
    };
    
    this.modalService.open(this.contentModal, opcoes)
  }
}
