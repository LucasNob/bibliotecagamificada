import { Component } from '@angular/core';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  constructor(private userService: UsuarioService) {

  }

  obterUsuario() {
    return this.userService.obterUsuario();
  }

}


