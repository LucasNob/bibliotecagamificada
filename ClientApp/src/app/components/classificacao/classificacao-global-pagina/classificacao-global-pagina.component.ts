import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemClassificacaoGlobal } from 'src/app/models/classificacao/ItemClassificacaoGlobal.model';
import { PontoClassificacaoGlobal } from 'src/app/models/classificacao/PontoClassificacaoGlobal.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { PontoService } from 'src/app/services/pontos.service';
import { AppBarService } from '../../app-bar/app-bar.service.';

@Component({
  selector: 'app-classificacao-global-pagina',
  templateUrl: './classificacao-global-pagina.component.html',
  styleUrls: ['./classificacao-global-pagina.component.css']
})
export class ClassificacaoGlobalPaginaComponent implements OnInit{

  listaPontos = new Array<PontoClassificacaoGlobal>();
  classificacaoGlobal= new Array<ItemClassificacaoGlobal>(); 
  usuario?: Usuario;

  constructor(
    private pontoService: PontoService,
    private appbarService:AppBarService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.usuario = this.authService.obterDadosUsuario(); 
    let url = this.activatedRoute.snapshot.url.join().split(',')
      
    if (this.usuario?.permissao == 1 || this.usuario?.permissao == 2) {
      this.iniciarAppbar();
    }
    this.obterClassificacaoGlobal();
  }

  iniciarAppbar() { 
    this.appbarService.limparLinks();
  }

  obterClassificacaoGlobal() {
    this.pontoService.obterClassificacaoGlobal(new Date().getFullYear()).then(data => {
      this.listaPontos = data as Array<PontoClassificacaoGlobal>;
      this.obterLista();
    });
  }

  obterLista() {
    let listaClassificacao = new Array<ItemClassificacaoGlobal>();
    let item = 4;
    
    this.listaPontos = this.listaPontos.sort((a: PontoClassificacaoGlobal, b: PontoClassificacaoGlobal) => (a.quantidadePontos <= b.quantidadePontos) ? 1 : -1);
    
    console.log(this.listaPontos)
    let listaP = this.listaPontos;
    
    listaClassificacao.push(
      new ItemClassificacaoGlobal(
        listaP[0].quantidadePontos,
        1,
        listaP[0].instituicao.nome,
        listaP[0].instituicao.foto,
        "../../../../assets/images/Ouro.png",
      )
    )
    
    for (let i = 1; i < listaP.length; i++){

      if (listaClassificacao[i - 1].pontos == listaP[i].quantidadePontos) {
        listaClassificacao.push(
          new ItemClassificacaoGlobal(
            listaP[i].quantidadePontos,
            item - 1,
            listaP[i].instituicao.nome,
            listaP[i].instituicao.foto,
            listaClassificacao[i - 1].premio,
          )
        );
      }
      else if (listaClassificacao[i - 1].premio == "../../../../assets/images/Ouro.png") {
        listaClassificacao.push(
          new ItemClassificacaoGlobal(
            listaP[i].quantidadePontos,
            i + 1,
            listaP[i].instituicao.nome,
            listaP[i].instituicao.foto,
            "../../../../assets/images/Prata.png",
          )
        );
      }
      else if (listaClassificacao[i - 1].premio == "../../../../assets/images/Prata.png") {
        listaClassificacao.push(
          new ItemClassificacaoGlobal(
            listaP[i].quantidadePontos,
            i + 1,
            listaP[i].instituicao.nome,
            listaP[i].instituicao.foto,
            "../../../../assets/images/Bronze.png",
          )
        );
      }
      else{
        listaClassificacao.push(
          new ItemClassificacaoGlobal(
            listaP[i].quantidadePontos,
            item++,
            listaP[i].instituicao.nome,
            listaP[i].instituicao.foto,
          )
        );
      }
    }
    this.classificacaoGlobal = listaClassificacao;
  }
}