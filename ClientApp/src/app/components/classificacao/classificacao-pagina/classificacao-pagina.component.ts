import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GetModelLista } from 'src/app/models/GetModelLista.model';
import { Ponto } from 'src/app/models/entidades/Ponto.model';
import { Turma } from 'src/app/models/entidades/Turma.model';
import { GetModelUnico } from 'src/app/models/GetModelUnico.model';

@Component({
  selector: 'app-classificacao-pagina',
  templateUrl: './classificacao-pagina.component.html',
  styleUrls: ['./classificacao-pagina.component.css']
})
export class ClassificacaoPaginaComponent implements OnInit {
  
  dados = new Array<Ponto>();
  turma?: Turma;
  // pontosService: PontosService;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string,private router: Router,private route: ActivatedRoute) {
    let url = baseUrl + 'v1/classificacao/obterPorTurma/'
    let id="";
    this.route.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id')!;
      url = url + id;
    });

    //obter lista de pontos da turma
    http.get<GetModelLista<Ponto>>(url).subscribe(result => {
      this.dados = result.objeto!;
    }, error => console.error(error));

    //obter dados da turma
    http.get<GetModelUnico<Turma>>(baseUrl + 'v1/turma/obterTurma/'+id).subscribe(result => {
      this.turma = result.objeto;
    }, error => console.error(error));
  }
  ngOnInit(): void {
    // console.log('on init')
  }
  
  getListaPontos(): Array<Ponto> {
    return this.dados;
  }
}
