import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router,private usuarioService:UsuarioService) { }
  ngOnInit(): void {
  }
  navegarComoProfessor() {
    this.usuarioService.novoUsuario("idProfessor1", "Prof. Vinicius", 2);
    this.router.navigateByUrl('/selecaoturma', { state: { Usuario: this.usuarioService.obterUsuario()} });
  }
  navegarComoAluno() {
    this.usuarioService.novoUsuario("idaluno1", "Aluno Felipe", 3);
    this.router.navigateByUrl('/selecaoturma', { state: { Usuario: this.usuarioService.obterUsuario()} });
  }
}