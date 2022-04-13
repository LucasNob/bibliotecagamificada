import { HttpClient } from '@angular/common/http';
import { newArray } from '@angular/compiler/src/util';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GetModelUnico } from 'src/app/models/GetModelUnico.model';
import { Ponto } from 'src/app/models/Ponto.model';

@Component({
  selector: 'app-classificacao-pagina',
  templateUrl: './classificacao-pagina.component.html',
  styleUrls: ['./classificacao-pagina.component.css']
})
export class ClassificacaoPaginaComponent implements OnInit {
  
  dados = new Ponto();
  // pontosService: PontosService;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string,private router: Router,private route: ActivatedRoute) {
    // this.pontosService = new PontosService(http, baseUrl);
    let url = baseUrl + 'v1/classificacao/obterPorTurma/'
    this.route.paramMap.subscribe((params: ParamMap) => {
      // this.dados = this.pontosService.obterPontosPorTurma(params.get('id')!);
      url = url+params.get('id');
    });

    http.get<GetModelUnico<Ponto>>(url).subscribe(result => {
      console.log(result);
      this.dados = result.objeto!;
    }, error => console.error(error));
  }
  ngOnInit(): void {
    
  }
  
  getListaAlunos(): Array<Ponto> {
    return new Array<Ponto>();
  }
}
