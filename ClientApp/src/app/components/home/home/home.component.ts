import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetModelLista } from 'src/app/models/GetModelLista.model';
import { Turma } from 'src/app/models/Turma.model';
import { Usuario } from 'src/app/models/usuario.model';

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
    this.usuario.id = "0000";
    this.usuario.nome = "Lucas Vinicius";

    // this.turmaService = new TurmaService(http, baseUrl);

    http.get<GetModelLista<Turma>>(baseUrl + 'v1/turma/obter').subscribe(result => {
      console.log(result);
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
}

