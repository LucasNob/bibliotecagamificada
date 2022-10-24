import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemClassificacaoEscolar } from 'src/app/models/classificacao/ItemClassificacaoEscolar.model';
import { PontoClassificacaoEscolar } from 'src/app/models/classificacao/PontoClassificacaoEscolar.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { PontoService } from 'src/app/services/pontos.service';
import { AppBarService } from '../../app-bar/app-bar.service.';

@Component({
  selector: 'app-classificacao-escolar-pagina',
  templateUrl: './classificacao-escolar-pagina.component.html',
  styleUrls: ['./classificacao-escolar-pagina.component.css']
})
export class ClassificacaoEscolarPaginaComponent implements OnInit {

  listaPontos = new Array<PontoClassificacaoEscolar>();
  classificacaoEscolar = new Array<ItemClassificacaoEscolar>();
  ano = new Date().getFullYear();
  usuario?: any;

  constructor(
    private pontoService: PontoService,
    private appbarService: AppBarService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.obterDadosUsuario();
    let url = this.activatedRoute.snapshot.url.join().split(',')

    if (this.usuario?.permissao == 1 || this.usuario?.permissao == 2) {
      this.iniciarAppbar();
    }
    this.obterClassificacaoEscolar();
  }

  iniciarAppbar() {
    this.appbarService.limparLinks();
  }


  obterClassificacaoEscolar() {
    this.pontoService.obterClassificacaoEscolar(new Date().getFullYear(), this.usuario!.permissao == 1? this.usuario?.id:this.usuario?.instituicao).then(data => {
      this.listaPontos = data as Array<PontoClassificacaoEscolar>;
      this.obterLista();
    });
  }


  obterLista() {
    let listaClassificacao = new Array<ItemClassificacaoEscolar>();
    let item = 4;

    this.listaPontos = this.listaPontos.sort((a: PontoClassificacaoEscolar, b: PontoClassificacaoEscolar) => (a.quantidadePontos <= b.quantidadePontos) ? 1 : -1);

    let listaP = this.listaPontos;

    listaClassificacao.push(
      new ItemClassificacaoEscolar(
        listaP[0].quantidadePontos,
        1,
        listaP[0].turma.nome,
        listaP[0].professor.foto,
        "../../../../assets/images/Ouro.png",
      )
    )

    for (let i = 1; i < listaP.length; i++) {

      if (listaClassificacao[i - 1].pontos == listaP[i].quantidadePontos) {
        listaClassificacao.push(
          new ItemClassificacaoEscolar(
            listaP[i].quantidadePontos,
            item - 1,
            listaP[i].turma.nome,
            listaP[i].professor.foto,
            listaClassificacao[i - 1].premio,
          )
        );
      }
      else if (listaClassificacao[i - 1].premio == "../../../../assets/images/Ouro.png") {
        listaClassificacao.push(
          new ItemClassificacaoEscolar(
            listaP[i].quantidadePontos,
            i + 1,
            listaP[i].turma.nome,
            listaP[i].professor.foto,
            "../../../../assets/images/Prata.png",
          )
        );
      }
      else if (listaClassificacao[i - 1].premio == "../../../../assets/images/Prata.png") {
        listaClassificacao.push(
          new ItemClassificacaoEscolar(
            listaP[i].quantidadePontos,
            i + 1,
            listaP[i].turma.nome,
            listaP[i].professor.foto,
            "../../../../assets/images/Bronze.png",
          )
        );
      }
      else {
        listaClassificacao.push(
          new ItemClassificacaoEscolar(
            listaP[i].quantidadePontos,
            item++,
            listaP[i].turma.nome,
            listaP[i].professor.foto,
          )
        );
      }
    }
    this.classificacaoEscolar = listaClassificacao;
  }

}
