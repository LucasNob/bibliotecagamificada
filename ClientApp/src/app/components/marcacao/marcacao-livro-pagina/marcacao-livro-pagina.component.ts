import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PontoAtualizacao } from 'src/app/models/classificacao/PontoAtualizacao.model';
import { Aluno } from 'src/app/models/entidades/Aluno.model';
import { Livro } from 'src/app/models/entidades/Livro.model';
import { Turma } from 'src/app/models/entidades/Turma.model';
import { LivroService } from 'src/app/services/livro.service';
import { PontoService } from 'src/app/services/pontos.service';

@Component({
  selector: 'app-marcacao-livro-pagina',
  templateUrl: './marcacao-livro-pagina.component.html',
  styleUrls: ['./marcacao-livro-pagina.component.css']
})
export class MarcacaoLivroPaginaComponent implements OnInit {

  constructor(private livroService:LivroService,private pontoService:PontoService, private router: Router) { }

  // @Input()
  aluno?: Aluno;
  
  // @Input()
  turma?: Turma; 

  listaLivros?: Array<Livro>;
  listaLivrosMarcados?: Array<String>;

  ngOnInit(): void {
    this.aluno = history.state.Aluno;
    this.turma = history.state.Turma;

    this.livroService.obterListaLivros(this.turma!.livros!).then(data => {
      this.listaLivros = data as Array<Livro>;
    });;
  }
  obterListaLivros() { 
    return this.listaLivros;
  }
  check(id: String) {
    if (this.listaLivrosMarcados?.find(m => m == id) == undefined)
      this.listaLivrosMarcados?.push(id);
    else
      this.listaLivrosMarcados.slice(this.listaLivrosMarcados.findIndex(m => m == id));
  } 
  salvar() { 
    let atualizacao = new PontoAtualizacao("",this.listaLivrosMarcados!,0)
    this.pontoService.atualizarPontuacao(atualizacao).then(data => {
      console.log(data);
    });
  }
}
