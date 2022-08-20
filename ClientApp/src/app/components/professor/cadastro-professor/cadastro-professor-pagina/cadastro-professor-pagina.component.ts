import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppBarService } from 'src/app/components/app-bar/app-bar.service.';
import { Professor } from 'src/app/models/entidades/Professor.model';
import { ProfessorCadastroModel } from 'src/app/models/entidades/ProfessorCadastro.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-cadastro-professor-pagina',
  templateUrl: './cadastro-professor-pagina.component.html',
  styleUrls: ['./cadastro-professor-pagina.component.css']
})
export class CadastroProfessorPaginaComponent implements OnInit {

  formCadastro!: FormGroup;
  usuario?: any;
  listaProfessores: Array<Professor> = [];
  edicao: string = "";
  estado: boolean = false;
  
  imgCarregada?: any;
  imagemAtual?: String = "../../../assets/images/default_avatar.png";

  constructor(private professorService: ProfessorService,
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
    this.criarForm(new Professor("","",2,undefined));
    this.obterLista();
  }

  iniciarAppbar() { 
    this.appbarService.limparLinks();
  }

  obterLista() {
    this.professorService.ObterProfessoresPorInstituicao(this.usuario?.id!).then(data => {
        this.listaProfessores = data as Array<Professor>;
      });
  }

  criarForm(professor: Professor) {
    this.formCadastro = this.formBuilder.group(
      {
        nome: [professor.nome],
        email: [professor.email],
        instituicao: [this.usuario.id],
        foto: [professor.foto],
        telefone:[professor.telefone]
      }
    );
  }
  
  cadastrarProfessor() {
    this.formCadastro.get('nome')!.setValue(this.formCadastro.get('nome')?.value.trim());
    this.formCadastro.get('email')!.setValue(this.formCadastro.get('email')?.value.trim());
    if (this.formCadastro.valid && this.estado == false)
    {
      this.estado = true;
      let professor = this.obterObjeto();
      this.authService.criarUsuario(professor.email, '12341234').then(res => {
        if (res) {
          this.authService.redefinirSenha(professor.email,'E-mail para cadastro de senha enviado.');
          this.professorService.cadastrarProfessor(professor).then(() => {
            this.obterLista();
            this.limparCampos();
          });
        }
      }).finally(() => {
        this.estado = false;
      });
    }
}

obterObjeto() {
  let professor = new ProfessorCadastroModel(
    this.formCadastro.get('nome')!.value,
    this.formCadastro.get('email')!.value,
    this.usuario?.permissao == 1 ? this.usuario.id : this.usuario?.instituicao!,
    this.formCadastro.get('telefone')!.value,
    this.imgCarregada
  );
  if (this.edicao != "")
    professor.id = this.edicao;
  
  return professor;
}

editarProfessor(id: string) {
  let professor = this.listaProfessores.find(m => m.id == id);
  this.formCadastro.get('nome')!.setValue(professor?.nome);
  this.formCadastro.get('email')!.setValue(professor?.email);
  this.formCadastro.get('telefone')!.setValue(professor?.telefone)
  this.edicao = id;

  this.imagemAtual = professor?.foto!;
  this.imgCarregada = professor?.foto!;
}

excluirProfessor(id: string) {
  const professor = this.listaProfessores.find(a => a.id == id);
  if (professor) {
    this.professorService.excluirProfessor(id).then(() => {
      this.obterLista();
    });
  }
}

limparCampos() { 
  this.criarForm(new Professor("", "", 2, undefined));
  const str: String = "../../../assets/images/default_avatar.png";
  this.edicao = "";
  this.imgCarregada = undefined;
  this.imagemAtual = Object.assign(str);
  this.cdRef.detectChanges();
}

salvar() {
  this.formCadastro.get('nome')!.setValue(this.formCadastro.get('nome')?.value.trim());
  this.formCadastro.get('email')!.setValue(this.formCadastro.get('email')?.value.trim());
  if (this.formCadastro.valid && this.estado == false)
  {
    this.estado = true;
    let professor = this.obterObjeto();
      this.professorService.editarProfessor(professor).then(() => {
        this.obterLista()
        this.limparCampos()
        }
      ).finally(() => { 
        this.estado = false;
      });
      this.edicao = "";
  }
}

modoEdicao() {
  if (this.edicao != "") {
    return true;
  }
  else return false;
}

estadoBotao() {
  if (!this.formCadastro.get('nome')?.value || this.emailValido() || this.telefoneValido())
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

telefoneValido() {
  if (this.formCadastro.get('telefone')) {
  const t = this.formCadastro.get('telefone')?.value;
  if (/^\([1-9]{2}\)[0-9]{4,5}-[0-9]{4}$/.test(t))
  return false;
  }
  return true;
}

obterNome() {
  return this.usuario.nome;
}
usuarioInstituicao() {
  return this.usuario.permissao === 1;
}

}
