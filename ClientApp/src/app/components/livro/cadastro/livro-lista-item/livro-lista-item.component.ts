import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Livro } from 'src/app/models/entidades/Livro.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-livro-lista-item',
  templateUrl: './livro-lista-item.component.html',
  styleUrls: ['./livro-lista-item.component.css']
})
export class LivroListaItemComponent implements OnInit {
  usuario?: Usuario;
  constructor(private authService: AuthService) {
    let usuario = authService.obterDadosUsuario();
    this.usuario = usuario;
  }

  @Input()
  livro?:Livro;

  @Output()
  excluirEmitter = new EventEmitter<string>();
  
  @Output()
  editarEmitter = new EventEmitter<string>();
  
  @Output()
  quizEmitter = new EventEmitter<string>();

  ngOnInit(): void {
  }
  Editar() {
    this.editarEmitter.emit(this.livro?.id);
  }
  Excluir() {
    this.excluirEmitter.emit(this.livro?.id);
  }
  Quiz() {
    this.quizEmitter.emit(this.livro?.id);
  }
}
