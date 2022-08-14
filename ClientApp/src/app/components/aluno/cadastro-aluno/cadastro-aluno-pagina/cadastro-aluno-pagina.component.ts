import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppBarService } from 'src/app/components/app-bar/app-bar.service.';
import { Aluno } from 'src/app/models/entidades/Aluno.model';
import { AlunoCadastroModel } from 'src/app/models/entidades/AlunoCadastro.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { AlunoService } from 'src/app/services/aluno.service';
import { AuthService } from 'src/app/services/auth.service';

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
        foto: [aluno.foto],
        dataNascimento:[aluno.dataNascimento]
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
        this.authService.criarUsuario(aluno.email, '12341234').then(res => {
          if (res) {
            this.authService.redefinirSenha(aluno.email,'E-mail para cadastro de senha enviado.');
            this.alunoService.cadastrarAluno(aluno).then(() => {
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
    let aluno = new AlunoCadastroModel(
      this.formCadastro.get('nome')!.value,
      this.formCadastro.get('email')!.value,
      this.usuario?.permissao == 1 ? this.usuario.id : this.usuario?.instituicao!,
      this.formCadastro.get('dataNascimento')!.value as Date,
      this.imgCarregada
    );
    if (this.edicao != "")
      aluno.id = this.edicao;
    
    return aluno;
  }

  editarAluno(id: string) {
    let aluno = this.listaAlunos.find(m => m.id == id);
    let data = new Date(aluno?.dataNascimento as Date);
    this.formCadastro.get('nome')!.setValue(aluno?.nome);
    this.formCadastro.get('email')!.setValue(aluno?.email);
    this.formCadastro.get('dataNascimento')!.setValue(data.toISOString().split('T')[0]);
    this.edicao = id;

    this.imagemAtual = aluno?.foto!;
    this.imgCarregada = aluno?.foto!;
  }

  excluirAluno(id: string) {
    const aluno = this.listaAlunos.find(a => a.id == id);
    if (aluno) {
      // this.authService.excluirLogin(aluno.email)
      this.alunoService.excluirAluno(id).then(() => {
        this.obterLista();
      });
    }
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
    // console.log(!this.formCadastro.get('nome')?.value)
    // console.log(this.emailValido())
    // console.log(!this.dataValida())
    if (!this.formCadastro.get('nome')?.value || this.emailValido() || !this.dataValida())
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
  dataValida() {
    const d = this.formCadastro.get('dataNascimento')?.value;
    if (typeof d == 'string') {
      let data = d.split('-');
      if (
        Number(data[0]) <= 1900 ||
        Number(data[0]) > this.obterAnoAtual() ||
        Number(data[1]) < 1 ||
        Number(data[1]) > 12||
        Number(data[2]) > 32 ||
        Number(data[2]) < 1 
      )
        return false;
      return true;
    } 
    return false;
  }
  obterAnoAtual() {
    const data = new Date()
    return data.getFullYear();
  }
  obterDataAtual() {
    const data = new Date()
    return data.toDateString();
  }
  obterNome() {
    return this.usuario.nome;
  }
  usuarioInstituicao() {
    return this.usuario.permissao === 1;

  }
}