import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Turma } from 'src/app/models/entidades/Turma.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { GetModelLista } from 'src/app/models/GetModelLista.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario = new Usuario;
  listaTurmas: Array<Turma> = [];
  // turmaService: TurmaService;
  retorno: any;
  
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string,private router: Router){
    
    this.usuario.id = "idaluno1";
    this.usuario.nome = "Lucas Vinicius";
    this.usuario.foto = "../../../../assets/default_avatar.png";

    http.get<GetModelLista<Turma>>(baseUrl + 'v1/turma/obterTurmasUsuario/'+this.usuario.id).subscribe(result => {
      // console.log(result);
      this.listaTurmas = result.objeto;
    }, error => console.error(error));
  
    // this.listaTurmas = this.turmaService.obterTurmas().objeto;
  }
  ngOnInit(): void {
  }
  obterUsuario() {
    return this.usuario;
  }
  obterTurmas() {
    return this.listaTurmas;
  }
  navegar(id: String) {
    let url = '/listaclassificacao/' + id;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([url]);
  });
  }
}

