import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ponto } from 'src/app/models/entidades/Ponto.model';
import { Turma } from 'src/app/models/entidades/Turma.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { PontoService } from 'src/app/services/pontos.service';
import { TurmaService } from 'src/app/services/turma.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-classificacao-pagina',
  templateUrl: './classificacao-pagina.component.html',
  styleUrls: ['./classificacao-pagina.component.css']
})
export class ClassificacaoPaginaComponent implements OnInit {

  pontos = new Array<Ponto>();
  turmaAtual?: Turma;
  // pontosService: PontosService;
  listaTurmas: Array<Turma> = [];
  usuario?: Usuario;

  constructor(
    http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private turmaService: TurmaService,
    private pontoService: PontoService) {

    // let url = baseUrl + 'v1/classificacao/obterPorTurma/'
    // let id="";
    this.usuario = usuarioService.obterUsuario();

    turmaService.obterTurmasPorIdUsuario(this.usuario.id).then(data => {
      this.listaTurmas = data as Array<Turma>;
    });

    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   id = params.get('id')!;
    //   url = url + id;
    // });
  }
  ngOnInit(): void {
    // console.log('on init')
  }

  obterTurmasUsuario() {
    return this.listaTurmas;
  }

  getListaPontos(): Array<Ponto> {
    return this.pontos;
  }

  obterClassificacaoTurma(id: String) {
    this.turmaAtual = this.listaTurmas.find(value => value.id == id);
    this.pontoService.obterClassificacaoPorIdTurma(id).then(data => {
      this.pontos = data as Array<Ponto>;
    });
  }

  obterTurmaAtual() {
    return this.turmaAtual;
  }
}
