import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Aluno } from 'src/app/models/entidades/Aluno.model';
import { Livro } from 'src/app/models/entidades/Livro.model';
import { Ponto } from 'src/app/models/entidades/Ponto.model';
import { Professor } from 'src/app/models/entidades/Professor.model';
import { Turma } from 'src/app/models/entidades/Turma.model';
import { TurmaCadastroModel } from 'src/app/models/entidades/TurmaCadastro.model';
import { LivroService } from 'src/app/services/livro.service';
import { TurmaService } from 'src/app/services/turma.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-cadastro-turma-livro-pagina',
  templateUrl: './cadastro-turma-livro-pagina.component.html',
  styleUrls: ['./cadastro-turma-livro-pagina.component.css']
})
export class CadastroTurmaLivroPaginaComponent implements OnInit {

  usuario: Professor;

  constructor(
    private livroService: LivroService,
    private usuarioService: UsuarioService,
    private turmaService: TurmaService,
    private location: Location,
    private activatedRoute: ActivatedRoute) {
    this.usuario = usuarioService.obterUsuario() as Professor;
  }
  
  // @Input()
  turma?: Turma; 

  ponto?: Ponto;
  listaLivros?: Array<Livro> = [];
  listaLivrosTurma?: Array<Livro> = [];
  listaLivrosMarcados?: Array<String> = [];
  listaLivrosMarcadosOriginal?: Array<String> = [];

  carregado = false;

  ngOnInit(): void {
    this.obter();    
  }
  obter() { 
    let url = this.activatedRoute.snapshot.url.join().split(',')
    this.turmaService.obterTurmaPorIdTurma(url[1]).then(data => { 
      this.turma = data as Turma;
      if (this.turma == undefined)
        this.location.back()
    
        this.livroService.obterLivrosPorIdInstituicao(this.usuario.instituicao).then(data => {
          
          this.listaLivros = data as Array<Livro>;
          
        if (this.turma?.livros != undefined && this.turma.livros.length > 0)
          this.livroService.obterListaLivros(this.turma?.livros).then(data => {
            this.listaLivrosTurma = data as Array<Livro>;
            this.listaLivros?.forEach(livro => {

              this.listaLivrosTurma!.forEach(element => {
                if (element.id == livro.id) {
                  this.listaLivrosMarcados?.push(livro.id);
                  this.listaLivrosMarcadosOriginal?.push(livro.id);
                }
              });
            })
            
            this.listaLivros = this.listaLivros?.filter( l => {
              return !this.listaLivrosMarcados!.includes(l.id);
            });
            this.carregado = true;
          })
          else
          this.carregado = true;
      })
    })
  }
  obterListaLivros() { 
    if (this.listaLivros == undefined)
      return [];
    return this.listaLivros;
  }
  obterListaLivrosTurma() {
    if (this.listaLivrosTurma == undefined)
      return [];
    return this.listaLivrosTurma;
  }
  check(id: String) {
    let livro = this.listaLivros?.find(l => l.id == id);
    this.listaLivros?.splice(this.listaLivros.findIndex(l => l.id == id),1)
    this.listaLivrosTurma?.push(livro!);
    this.listaLivrosMarcados?.push(livro!.id);
  } 
  uncheck(id: String) {
    let livro = this.listaLivrosTurma?.find(l => l.id == id);
    this.listaLivros?.push(livro!);
    this.listaLivrosTurma?.splice(this.listaLivrosTurma.findIndex(l => l.id == id),1)
    this.listaLivrosMarcados?.splice(this.listaLivrosMarcados.findIndex(l => l == id),1)
  } 
  salvar() { 
    let turma = new TurmaCadastroModel(this.turma!.nome, this.turma?.anoLetivo!, this.turma?.instituicao!, this.usuario.id)
    turma.id = this.turma?.id;
    turma.livros = this.listaLivrosMarcados!;
    this.turmaService.atualizarLivrosTurma(turma).then(data => {
      this.obter();
    })
  }
  mostrarBotaoVoltar(id: String) {
    if (this.listaLivrosMarcadosOriginal?.includes(id))
      return false;
      return true;
  }

}
