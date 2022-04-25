import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Turma } from 'src/app/models/entidades/Turma.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { GetModelLista } from 'src/app/models/GetModelLista.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listaTurmas: Array<Turma> = [];
  // turmaService: TurmaService;
  retorno: any;
  rotas: Array<Rota>;

  // constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string,private router: Router){
  constructor(private userService: UsuarioService) {

    // this.usuario.id = "idaluno1";
    // this.usuario.nome = "Lucas Vinicius";
    // this.usuario.foto = "../../../../assets/default_avatar.png";

    // http.get<GetModelLista<Turma>>(baseUrl + 'v1/turma/obterTurmasUsuario/'+this.usuario.id).subscribe(result => {
    //   // console.log(result);
    //   this.listaTurmas = result.objeto;
    // }, error => console.error(error));
  
    this.rotas = [
      new Rota('Classificação', 'listaclassificacao'),
      new Rota('Cadastro Livro', 'cadastrolivro')
    ]
  }
  ngOnInit(): void {
  }
  obterUsuario() {
    return this.userService.obterUsuario();
  }
  // obterTurmas() {
  //   return this.listaTurmas;
  // }
  
  // navegar(id: String) {
  //   let url = '/listaclassificacao/' + id;
  //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
  //     this.router.navigate([url]);
  // });
  // }

  obterRotas(){
    return this.rotas;
  }
}
class Rota{
  nome?: String;
  rota?: String;
  constructor(nome:String ,rota:String) {
    this.nome = nome;
    this.rota = rota;
  }
}


