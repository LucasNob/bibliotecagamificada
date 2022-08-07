import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppBarService } from 'src/app/components/app-bar/app-bar.service.';
import { Aluno } from 'src/app/models/entidades/Aluno.model';
import { AlunoCadastroModel } from 'src/app/models/entidades/AlunoCadastro.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { AlunoService } from 'src/app/services/aluno.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro-aluno-pagina',
  templateUrl: './cadastro-aluno-pagina.component.html',
  styleUrls: ['./cadastro-aluno-pagina.component.css']
})
export class CadastroAlunoPaginaComponent implements OnInit {
  
  formCadastro!: FormGroup;
  usuario?: any;
  listaAlunos: Array<Aluno> = [];
  edicao: string = "";
  estado: boolean = false;
  
  imgCarregada?: any;
  imagemAtual?: String = "../../../assets/images/default_avatar.png";

  constructor(private alunoService: AlunoService,
    private appbarService: AppBarService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  )
  { 
    let usuario = authService.obterDadosUsuario();
    if (usuario?.permissao == 1) {
      this.usuario = usuario as Usuario;
      this.iniciarAppbar();
    }
    // else if (usuario?.permissao == 2) {
    //   this.usuario = usuario as Professor;
    //   this.iniciarAppbar();
    // }
    else
      this.router.navigateByUrl('#');
  }

  ngOnInit(): void { 
    this.criarForm(new Aluno("","",3,undefined));
    this.obterLista();
  }

  iniciarAppbar() { 
    this.appbarService.limparLinks();
  }

  obterLista() {
    this.alunoService.ObterAlunosPorInstituicao(this.usuario?.id!).then(data => {
        this.listaAlunos = data as Array<Aluno>;
      });
  }

  criarForm(aluno: Aluno) {
    this.formCadastro = this.formBuilder.group(
      {
        nome: [aluno.nome],
        email: [aluno.email],
        instituicao: [this.usuario.id],
        foto: [aluno.foto]
      }
    );
  }
  
  cadastrarAluno() {
      this.formCadastro.get('nome')!.setValue(this.formCadastro.get('nome')?.value.trim());
      this.formCadastro.get('email')!.setValue(this.formCadastro.get('email')?.value.trim());
      if (this.formCadastro.valid && this.estado == false)
      {
        this.estado = true;
        let aluno = this.obterObjeto();
        this.authService.signUp(aluno.email, '12341234', false).then(res => {
          this.authService.redefinirSenha(aluno.email);
          this.alunoService.cadastrarAluno(aluno).then(() => {
            this.obterLista();
            this.limparCampos();
          });
        }).finally(() => {
          this.estado = false;
        });
      }
  }

  obterObjeto() {
    let aluno = new AlunoCadastroModel(
      this.formCadastro.get('nome')!.value,
      this.formCadastro.get('email')!.value,
      this.usuario?.permissao == 1 ? this.usuario.id : this.usuario?.instituicao!,
      new Date(),
      this.imgCarregada
    );
    if (this.edicao != "")
      aluno.id = this.edicao;
    
    return aluno;
  }

  editarAluno(id: string) {
    let aluno = this.listaAlunos.find(m => m.id == id);

    this.formCadastro.get('nome')!.setValue(aluno?.nome);
    this.formCadastro.get('email')!.setValue(aluno?.email);
    this.edicao = id;

    this.imagemAtual = aluno?.foto!;
    this.imgCarregada = aluno?.foto!;
  }

  excluirAluno(id:string) {
    this.alunoService.excluirAluno(id).then(() => {
      this.obterLista();
    });
  }

  limparCampos() { 
    this.criarForm(new Aluno("", "", 3, undefined));
    const str: String = "../../../assets/images/default_avatar.png";
    this.edicao = "";
    this.imgCarregada = undefined;
    this.imagemAtual = Object.assign(str);
    this.cdRef.detectChanges();
  }

  salvar() {
    //TODO rever ao mudar o email o cadastro deve ser excluido e refeito
    this.formCadastro.get('nome')!.setValue(this.formCadastro.get('nome')?.value.trim());
    this.formCadastro.get('email')!.setValue(this.formCadastro.get('email')?.value.trim());
    if (this.formCadastro.valid && this.estado == false)
    {
      this.estado = true;
      let aluno = this.obterObjeto();
      this.alunoService.editarAluno(aluno).then(() => {
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
    if (!this.formCadastro.get('nome')?.value)
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
  obterAnoAtual() {
    const data = new Date()
    return data.getFullYear();
  }
  obterNome() {
    return this.usuario.nome;
  }
  usuarioInstituicao() {
    return this.usuario.permissao === 1;

  }
}