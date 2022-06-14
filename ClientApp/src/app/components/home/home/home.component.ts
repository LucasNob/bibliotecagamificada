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
  navegarComoInstituicao() {
    this.router.navigateByUrl('/cadastrolivro');
  }
  navegarComoProfessor() {
    this.usuarioService.novoUsuario("idProfessor1", "Professora Giulia", 2, 
   "https://laboro.edu.br/wp-content/uploads/professor-de-educacao-especial-1024x683.jpg");
    this.router.navigateByUrl('/selecaoturma', { state: { Usuario: this.usuarioService.obterUsuario()} });
  }
  navegarComoAluno() {
    this.usuarioService.novoUsuario("idaluno1", "Aluno Felipe", 3,
    "https://cdn.pixabay.com/photo/2015/11/04/17/26/boy-1022996_960_720.jpg");
    this.router.navigateByUrl('/selecaoturma', { state: { Usuario: this.usuarioService.obterUsuario()} });
  }
}