import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Professor } from 'src/app/models/entidades/Professor.model';
import { Turma } from 'src/app/models/entidades/Turma.model';
import { TurmaCadastroModel } from 'src/app/models/entidades/TurmaCadastro.model';
import { TurmaService } from 'src/app/services/turma.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-cadastro-turma-pagina',
  templateUrl: './cadastro-turma-pagina.component.html',
  styleUrls: ['./cadastro-turma-pagina.component.css']
})
export class CadastroTurmaPaginaComponent implements OnInit {

  formCadastro!: FormGroup;
  usuario?: Professor;
  listaTurmas: Array<Turma> = [];
  edicao: String = "";
  estado: boolean = false;

  constructor(private turmaService: TurmaService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
  ) { 
      // this.usuarioService.usuario =  new Usuario("idinstituicao1", "Anglo Sorocaba",1,
      // "https://pbs.twimg.com/profile_images/570291758630576128/x3lqZT5Z_400x400.png");
      
      this.usuario = usuarioService.obterUsuario() as Professor; 
    // this.obterLista();
    }
    
  ngOnInit(): void { 
    this.criarForm(new Turma());
    this.obterLista();
  }
  obterLista() {
    this.turmaService.obterTurmasPorIdProfessor(this.usuario?.id!).then(data => {
      this.listaTurmas = data as Array<Turma>;
    });
  }
  
  criarForm(turma: Turma) {
    this.formCadastro = this.formBuilder.group(
      {
        nome: [turma.nome],
        anoLetivo: [turma.anoLetivo],
      }
    );
  }

  cadastrarTurma() {
      this.formCadastro.get('nome')!.setValue(this.formCadastro.get('nome')?.value.trim());
      // this.formCadastro.get('anoLetivo')!.setValue(this.formCadastro.get('anoLetivo')?.value.trim());
      //TODO tratar numero
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
      this.usuario?.instituicao!,
      this.usuario?.id!,
    );
    if (this.edicao != "")
      turma.id = this.edicao;
    
    return turma;
  }

  editarTurma(id: String) {
    let turma = this.listaTurmas.find(m => m.id == id);
   
    this.formCadastro.get('nome')!.setValue(turma?.nome);
    this.formCadastro.get('anoLetivo')!.setValue(turma?.anoLetivo);
    this.edicao = id;
  }

  excluirTurma(id:String) {
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
    // this.formCadastro.get('anoLetivo')!.setValue(this.formCadastro.get('anoLetivo')?.value.trim());
    // TODO tratar numero
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
    return this.formCadastro.valid
  }

  formInvalido(nome: any) { 
    if (nome == "" || nome == undefined)
      return true;
    if (this.formCadastro != undefined)
      if (this.formCadastro.get(nome)!.value == "" || this.formCadastro.get(nome)!.value == undefined)
        return true;
    return false;
  }
}
