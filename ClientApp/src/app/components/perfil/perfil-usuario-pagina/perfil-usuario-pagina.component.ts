import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Instituicao } from 'src/app/models/entidades/Instituicao.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { GrauEscolaridade } from 'src/app/models/livro/GrauEscolaridade.model';
import { OGrauEscolaridade } from 'src/app/models/livro/OGrauEscolaridade.model';
import { AuthService } from 'src/app/services/auth.service';
import { InstituicaoService } from 'src/app/services/instituicao.service';
import { AppBarService } from '../../app-bar/app-bar.service.';

@Component({
  selector: 'app-perfil-usuario-pagina',
  templateUrl: './perfil-usuario-pagina.component.html',
  styleUrls: ['./perfil-usuario-pagina.component.css']
})
export class PerfilUsuarioPaginaComponent implements OnInit {
  formCadastro!: FormGroup;
  usuario?: any;
  imgCarregada?: any;
  imagemAtual?: String = "../../../assets/images/default_avatar.png";

  constructor(
    private instituicaoService: InstituicaoService,
    private appbarService: AppBarService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdRef: ChangeDetectorRef) 
    {
    let usuario = authService.obterDadosUsuario();
    if (usuario?.permissao == 1) {
      this.usuario = usuario as Usuario;
      this.iniciarAppbar();
    }
    else
      this.router.navigateByUrl('#');
    }

  ngOnInit(): void {
    this.criarForm(new Instituicao("","",1,undefined));
  }

  iniciarAppbar() { 
    this.appbarService.limparLinks();
  }

  criarForm(instituicao: Instituicao) {
    this.formCadastro = this.formBuilder.group(
      {
        nome: [instituicao.nome],
        email: [instituicao.email],
        foto: [instituicao.foto],
        grauescolaridade:[instituicao.grauescolaridade],
        cep:[instituicao.cep],
        endereco:[instituicao.endereco]
      }
    );
  }

  estadoBotao() {
    if (!this.formCadastro.get('nome')?.value || this.emailValido() || this.cepValido())
      return false;
    return this.formCadastro.valid;
  }

  formInvalido(nome: any) { 
    if (nome == "" || nome == undefined)
      return true;
    if (this.formCadastro != undefined)
      if (this.formCadastro.get(nome)!.value == "" || this.formCadastro.get(nome)!.value == undefined)
        return true;
    return false;
  }

  emailValido() {
    if (this.formCadastro.get('email')) {
      const email = this.formCadastro.get('email')!.value;
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        return false;
    }
    return true;
  }
  
  cepValido()
  {
    return true;
  }
  
  salvar() {
  }

  excluir() {
  }
  
  listaGrauEscolaridade() {
    const ge = Object.keys(GrauEscolaridade).filter((v) => isNaN(Number(v)));
    return ge;
  }

  ObterNomeGrauEscolaridade(ge: any) { 
    return OGrauEscolaridade.ObterNome(+GrauEscolaridade[ge]);
  }
  
}
