import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppBarService } from 'src/app/components/app-bar/app-bar.service.';
import { Professor } from 'src/app/models/entidades/Professor.model';
import { Turma } from 'src/app/models/entidades/Turma.model';
import { TurmaCadastroModel } from 'src/app/models/entidades/TurmaCadastro.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { ProfessorService } from 'src/app/services/professor.service';
import { TurmaService } from 'src/app/services/turma.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro-turma-pagina',
  templateUrl: './cadastro-turma-pagina.component.html',
  styleUrls: ['./cadastro-turma-pagina.component.css']
})
export class CadastroTurmaPaginaComponent implements OnInit {
  
  formCadastro!: FormGroup;
  usuario?: any;
  listaTurmas: Array<Turma> = [];
  listaProfessores: Array<Professor> = [];
  edicao: string = "";
  estado: boolean = false;

  constructor(private turmaService: TurmaService,
    private usuarioService: UsuarioService,
    private appbarService: AppBarService,
    private formBuilder: FormBuilder,
    private router: Router,
    private professorService: ProfessorService,
  )
  { 
      let usuario = usuarioService.obterUsuario();
    if (usuario?.permissao == 1) {
      this.usuario = usuario as Usuario;
      this.professorService.ObterListaProfessoresPorIdInstitucicao(this.usuario.id).then(res => { 
        this.listaProfessores = res as Array<Professor>;
      });
      this.iniciarAppbar();
      }
    else if (usuario?.permissao == 2) {
      this.usuario = usuario as Professor;
      this.iniciarAppbar();
    }
      else
        this.router.navigateByUrl('#');
  }

  ngOnInit(): void { 
    this.criarForm(new Turma());
    this.obterLista();
  }

  iniciarAppbar() { 
    this.appbarService.limparLinks();
  }

  obterLista() {
    if (this.usuario.permissao == 1) {
      this.turmaService.obterTurmasPorIdInstituicao(this.usuario?.id!).then(data => {
        this.listaTurmas = data as Array<Turma>;
      });
    }
    else {
      this.turmaService.obterTurmasPorIdProfessor(this.usuario?.id!).then(data => {
        this.listaTurmas = data as Array<Turma>;
      });
    }
  }

  criarForm(turma: Turma) {
    this.formCadastro = this.formBuilder.group(
      {
        nome: [turma.nome],
        anoLetivo: [turma.anoLetivo],
        professor: [turma.professor]
      }
    );
  }

  cadastrarTurma() {
      this.formCadastro.get('nome')!.setValue(this.formCadastro.get('nome')?.value.trim());
      if (this.formCadastro.valid && this.estado == false)
      {
        this.estado = true;
        let turma = this.obterObjeto();
        this.turmaService.cadastrarTurma(turma).then(() => {
          this.obterLista();
          this.limparCampos();
        }
        ).finally(() => {
          this.estado = false;
        });
      }
  }

  obterObjeto() {
    let turma = new TurmaCadastroModel(
      this.formCadastro.get('nome')!.value,
      this.formCadastro.get('anoLetivo')!.value,
      this.usuario?.permissao == 1 ? this.usuario.id : this.usuario?.instituicao!,
      this.usuario?.permissao == 1 ? this.formCadastro.get('professor')!.value : this.usuario?.id!,
    );
    if (this.edicao != "")
      turma.id = this.edicao;
    
    return turma;
  }

  editarTurma(id: string) {
    let turma = this.listaTurmas.find(m => m.id == id);

    this.formCadastro.get('nome')!.setValue(turma?.nome);
    this.formCadastro.get('anoLetivo')!.setValue(turma?.anoLetivo);
    this.formCadastro.get('professor')!.setValue(turma?.professor);
    this.edicao = id;
  }

  excluirTurma(id:string) {
    this.turmaService.excluirTurma(id).then(data => {
      this.obterLista();
    });
  }

  limparCampos() { 
    this.criarForm(new Turma());
    this.edicao = "";
  }

  salvar() {
    this.formCadastro.get('nome')!.setValue(this.formCadastro.get('nome')?.value.trim());
    if (this.formCadastro.valid && this.estado == false)
    {
      this.estado = true;
      let turma = this.obterObjeto();
      this.turmaService.editarTurma(turma).then(() => {
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
      return true
    }
    else return false;
  }
  estadoBotao() {
    if (!this.formCadastro.get('professor')?.value)
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
  obterAnoAtual() {
    const data = new Date()
    return data.getFullYear();
  }
  obterNome() {
    return this.usuario.permissao === 1 ? this.usuario.nome : 'Prof. ' + this.usuario.nome;
  }
  usuarioInstituicao() {
    return this.usuario.permissao === 1;

  }
  obterListaProfessores() {
    if(this.listaProfessores !=undefined)
      return this.listaProfessores;
    return [];
  }
}