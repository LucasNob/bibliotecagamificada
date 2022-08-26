import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Instituicao } from 'src/app/models/entidades/Instituicao.model';
import { AuthService } from 'src/app/services/auth.service';
import { InstituicaoService } from 'src/app/services/instituicao.service';

@Component({
  selector: 'app-cadastro-usuario-pagina',
  templateUrl: './cadastro-usuario-pagina.component.html',
  styleUrls: ['./cadastro-usuario-pagina.component.css']
})
export class CadastroUsuarioPaginaComponent implements OnInit {
  formCadastro!: FormGroup;
  estado: boolean = false;

  imgCarregada?: any;
  imagemAtual?: String = "../../../assets/images/default_avatar.png";

  constructor(
    private instituicaoService: InstituicaoService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.authService.usuarioLogado())
    this.router.navigate(['/']);
    
    this.criarForm(new Instituicao("","",1,undefined));
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

  cadastrarInstituicao() {
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
  
  
}
