import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Livro } from 'src/app/models/entidades/Livro.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
  
  @Input()
  listaLivros: Array<Livro> = [];

  @Output()
  excluirEmitter = new EventEmitter<string>();
  
  @Output()
  quizEmitter = new EventEmitter<string>();
  
  @Output()
  editarEmitter = new EventEmitter<string>();

  usuario?: Usuario;
  constructor(private authService: AuthService) {
    let usuario = authService.obterDadosUsuario();
    this.usuario = usuario;
  }

  ngOnInit(): void {
  }
  obterLista() {
    return this.listaLivros;
  }
  emitExcluir(id: string) {
    this.excluirEmitter.emit(id);
  }
  emitEditar(id: string) {
    this.editarEmitter.emit(id);
  }
  emitQuiz(id: string) {
    this.quizEmitter.emit(id);
  }
}
