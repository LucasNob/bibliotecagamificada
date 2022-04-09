import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // constructor(
  //   private router: Router,
  //   private http: HttpClient
  // ) { }
  // constructor(
  //   private router: Router,
  //   private http: HttpClient
  // ) { }
  
  data!: dadosPontos; 
  
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<dadosPontos>(baseUrl + 'classificacao/obter').subscribe(result => {
      console.log(result);
    }, error => console.error(error));
  }


  ngOnInit(): void {
    // var data = this.get("http://localhost:5101/classificacao/obter");
  }
  
  // get(rota: string): Observable<any> {
  //       return this.http
  //           .get<any>(rota)
  //   }
  
}

interface dadosPontos{
  status: String;
  mensagem: String;
  objeto: Array<pontos>;
}

interface pontos{
  turma: String;
  aluno: String;
  livrosLidos: Array<String>;
  totalPontos: number;
  id: String;
  dataCriacao: any;
  dataAlteracao: any;
  dataExclusao: any;
  status: boolean;
}