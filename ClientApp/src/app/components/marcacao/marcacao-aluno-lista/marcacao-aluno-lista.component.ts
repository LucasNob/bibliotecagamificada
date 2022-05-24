import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output()
  selecaoEmitter = new EventEmitter<Aluno>();

  constructor() { }

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
}
