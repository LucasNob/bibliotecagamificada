import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalModule, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Instituicao } from 'src/app/models/entidades/Instituicao.model';
import { InstituicaoCadastroModel } from 'src/app/models/entidades/InstituicaoCadastro.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { GrauEscolaridade } from 'src/app/models/livro/GrauEscolaridade.model';
import { OGrauEscolaridade } from 'src/app/models/livro/OGrauEscolaridade.model';
import { AuthService } from 'src/app/services/auth.service';
import { InstituicaoService } from 'src/app/services/instituicao.service';
import { CepService } from 'src/app/services/viacep/cep.service';
import { AppBarService } from '../../app-bar/app-bar.service.';

@Component({
  selector: 'app-perfil-usuario-pagina',
  templateUrl: './perfil-usuario-pagina.component.html',
  styleUrls: ['./perfil-usuario-pagina.component.css']
})
export class PerfilUsuarioPaginaComponent implements OnInit, AfterViewInit {
  formCadastro!: FormGroup;
  usuario?: any;
  imgCarregada?: any;
  imagemAtual?: String = "../../../assets/images/default_avatar.png";
  estado = false;
  escolaridadeLista: Array<any> = [];
  emailAtual = '';
  
  @ViewChild('content')
  contentModal: any;

  constructor(
    private instituicaoService: InstituicaoService,
    private appbarService: AppBarService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private cepService: CepService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal) 
    {
    let usuario = authService.obterDadosUsuario();
    if (usuario?.permissao == 1) {
      this.usuario = usuario as Usuario;
      this.iniciarAppbar();
    }
    else
      this.router.navigateByUrl('#');
    }
  ngAfterViewInit(): void {
    this.obterInstituicao();
  }

  ngOnInit(): void {
    this.criarForm(new Instituicao("", "", 1, undefined));
  }
  
  obterInstituicao(){
    this.instituicaoService.obterInstituicaoPorId(this.usuario.id).then(res => {
      let instituicao = res as Instituicao;
      this.emailAtual = instituicao.email;
      this.imgCarregada = instituicao.foto;
      this.imagemAtual = instituicao.foto;
      this.criarForm(res);
      this.cdRef.detectChanges();
    })
  }
  iniciarAppbar() { 
    this.appbarService.limparLinks();
  }

  criarForm(instituicao:any) {
    this.escolaridadeLista = instituicao.grauEscolaridade;
    this.formCadastro = this.formBuilder.group(
      {
        nome: [instituicao.nome],
        email: [instituicao.email],
        foto: [instituicao.foto],
        grauescolaridade: [this.escolaridadeLista],
        cep:[instituicao.cep],
        endereco:[instituicao.endereco]
      }
    );
    let index = 0;
    for (let item in GrauEscolaridade) {
      if (this.escolaridadeLista) {
        if (this.escolaridadeLista.includes(GrauEscolaridade[item])) {
          (document.getElementById('checkbox' + GrauEscolaridade[item])as any)!.checked = true
        }
      }
      if (!isNaN(+item)) {
        index++;
      }
    }
  }

  estadoBotao() {
    if (!this.formCadastro.get('nome')?.value || this.emailValido() || this.cepValido() || this.estado || this.escolaridadeLista.length < 1)
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
  
  cepValido() {
    const pattern = /^[0-9]{5}-?[0-9]{3}$/;
    return !pattern.test(this.formCadastro.get('cep')!.value);
  }
  
  salvar() {
    this.formCadastro.get('nome')!.setValue(this.formCadastro.get('nome')?.value.trim());
    if (this.formCadastro.valid && this.estado == false){
      let instituicao = new InstituicaoCadastroModel(
        this.formCadastro.get('nome')!.value,
        this.formCadastro.get('email')!.value,
        this.formCadastro.get('grauescolaridade')!.value,
        this.formCadastro.get('cep')!.value,
        this.formCadastro.get('endereco')!.value,
        this.imgCarregada
      );
      instituicao.id = this.usuario.id;
      this.estado = true;
      this.instituicaoService.editarInstituicao(instituicao).then(ret => {
        if (ret) {
          if (this.emailAtual != instituicao.email) {
            this.router.navigate(['/verificar-email'])
            this.authService.SignOut();
          }
          else {
            this.authService.atualizarUsuario(instituicao.email);
          }
        }
        this.estado = false;
        this.cdRef.detectChanges();
      })
    }
  }

  excluir() {
    this.instituicaoService.excluirInstituicao(this.usuario.id).then(res => {
      this.authService.SignOut();
      this.modalService.dismissAll();
    })
  }
  
  abrirExcluir() {
      const opcoes: NgbModalOptions = {
        windowClass: "custom-modal"
      };
      
      this.modalService.open(this.contentModal, opcoes)
  }
  
  consultaCep(){
    if (!this.cepValido()){
      const cep = this.formCadastro.get('cep')!.value;
      this.cepService.buscar(cep).subscribe(dados => {
        const d = dados as any;
        if (d && d['erro']!='true') {
          this.preencheEndereco(dados)
        }
      })
    }
  }

  preencheEndereco(dados: any)
  {
    this.formCadastro.setValue({
      cep: dados.cep,
      endereco: dados.logradouro + ', ' + dados.bairro + ', ' + dados.localidade + ',' + dados.uf,
      nome: this.formCadastro.get('nome')!.value,
      email: this.formCadastro.get('email')!.value,
      foto: this.formCadastro.get('foto')!.value,
      grauescolaridade:this.formCadastro.get('grauescolaridade')!.value,
    });
  }

  listaGrauEscolaridade() {
    const list: Array<string> = [];
    for (let item in GrauEscolaridade) {
      !isNaN(+item) ? list.push(OGrauEscolaridade.ObterNome(+item)) : null;
    }
    return list;
  }

  adicionarEscolaridade(esc: any) {
    const num = OGrauEscolaridade.ObterNumero(esc);
    !this.escolaridadeLista.includes(num) ? this.escolaridadeLista.push(num) :
      this.escolaridadeLista.splice(this.escolaridadeLista.findIndex(e => e == num), 1);
    
      this.formCadastro.get('grauescolaridade')?.setValue(this.escolaridadeLista);
  }

  ObterNomeGrauEscolaridade(ge: any) { 
    return OGrauEscolaridade.ObterNome(+GrauEscolaridade[ge]);
  }
}
