import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Instituicao } from 'src/app/models/entidades/Instituicao.model';
import { InstituicaoCadastroModel } from 'src/app/models/entidades/InstituicaoCadastro.model';
import { Genero } from 'src/app/models/livro/Genero.model';
import { GrauEscolaridade } from 'src/app/models/livro/GrauEscolaridade.model';
import { OGrauEscolaridade } from 'src/app/models/livro/OGrauEscolaridade.model';
import { AuthService } from 'src/app/services/auth.service';
import { InstituicaoService } from 'src/app/services/instituicao.service';
import { CepService } from 'src/app/services/viacep/cep.service';

@Component({
  selector: 'app-cadastro-usuario-pagina',
  templateUrl: './cadastro-usuario-pagina.component.html',
  styleUrls: ['./cadastro-usuario-pagina.component.css']
})
export class CadastroUsuarioPaginaComponent implements OnInit {
  formCadastro!: FormGroup;
  imgCarregada?: any;
  imagemAtual?: String = "../../../assets/images/default_avatar.png";
  estado = false;
  escolaridadeLista: Array<any> = [];

  constructor(
    private instituicaoService: InstituicaoService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private cepService: CepService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.authService.usuarioLogado())
    this.router.navigate(['/']);
    
    this.criarForm(new Instituicao("","",1,undefined));
  }

  criarForm(instituicao: Instituicao) {
    this.escolaridadeLista = instituicao.grauescolaridade;
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

  cadastrarInstituicao() {
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
      this.estado = true;
      this.authService.criarUsuario(this.formCadastro.get('email')!.value, '12341234').then(res => {
        this.authService.redefinirSenha(instituicao.email,'E-mail para cadastro de senha enviado.');
        this.instituicaoService.cadastrarInstituicao(instituicao).then(ret => {
          this.router.navigate(['/verificar-email'])
        }
        ).finally(() => {
          this.estado = false;
          this.authService.SignOut();
          this.cdRef.detectChanges();
        });
      })
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
  
  cepValido(){
    const pattern = /^[0-9]{5}-?[0-9]{3}$/;
    return !pattern.test(this.formCadastro.get('cep')!.value);
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

  preencheEndereco(dados: any){
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
    this.escolaridadeLista.splice(this.escolaridadeLista.findIndex(e=> e == num), 1);
    this.formCadastro.get('grauescolaridade')?.setValue(this.escolaridadeLista);
  }

  ObterNomeGrauEscolaridade(ge: any) { 
    return OGrauEscolaridade.ObterNome(+GrauEscolaridade[ge]);
  }

}
