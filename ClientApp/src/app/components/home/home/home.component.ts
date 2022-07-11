import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Professor } from 'src/app/models/entidades/Professor.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
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
    this.usuarioService.novoUsuario(new Usuario("idinstituicao1", "Anglo Sorocaba", 1,"https://pbs.twimg.com/profile_images/570291758630576128/x3lqZT5Z_400x400.png"));
    this.router.navigateByUrl('/selecaoturma');
     // this.router.navigateByUrl('/selecaoturma', { state: { Usuario: this.usuarioService.obterUsuario()} });
  }
  navegarComoProfessor() {
    const usuario = new Professor("idProfessor1", "Professora Giulia", 2, "https://laboro.edu.br/wp-content/uploads/professor-de-educacao-especial-1024x683.jpg")
    usuario.instituicao = "idinstituicao1";
    this.usuarioService.novoUsuario(usuario);
    this.router.navigateByUrl('/selecaoturma');
    // this.router.navigateByUrl('/selecaoturma', { state: { Usuario: this.usuarioService.obterUsuario()} });
  }
  navegarComoAluno() {
    this.usuarioService.novoUsuario(new Usuario("idaluno1", "Felipe", 3,"https://cdn.pixabay.com/photo/2015/11/04/17/26/boy-1022996_960_720.jpg"));
    this.router.navigateByUrl('/selecaoturma');
    // this.router.navigateByUrl('/selecaoturma', { state: { Usuario: this.usuarioService.obterUsuario()} });
  }
}