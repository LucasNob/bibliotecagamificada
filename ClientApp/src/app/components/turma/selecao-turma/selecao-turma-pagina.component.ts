import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Turma } from 'src/app/models/entidades/Turma.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { TurmaService } from 'src/app/services/turma.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AppBarService } from '../../app-bar/app-bar.service.';

@Component({
  selector: 'app-selecao-turma-pagina',
  templateUrl: './selecao-turma-pagina.component.html',
  styleUrls: ['./selecao-turma-pagina.component.css']
})
export class SelecaoTurmaPaginaComponent implements OnInit {

  listaTurmas: Array<Turma> = [];
  usuario?: Usuario;

  constructor(
    private turmaService: TurmaService,
    private authService: AuthService,
    private appbarService: AppBarService,
    private router: Router) {
    this.usuario = authService.obterDadosUsuario();
  }

  ngOnInit(): void {
    if(this.usuario != undefined)
    {
      if (this.usuario.permissao == 1)
          this.turmaService.obterTurmasPorIdInstituicao(this.usuario!.id).then(data => {
          this.listaTurmas = data as Array<Turma>;
          this.iniciarAppbar();
        });
        if (this.usuario.permissao == 2)
        this.turmaService.obterTurmasPorIdProfessor(this.usuario!.id).then(data => {
          this.listaTurmas = data as Array<Turma>;
          this.iniciarAppbar();
      });
      if (this.usuario.permissao == 3)
        this.turmaService.obterTurmasPorIdAluno(this.usuario!.id).then(data => {
        this.listaTurmas = data as Array<Turma>;
      });
    }
  }

  iniciarAppbar() { 
    this.appbarService.limparLinks();
    this.appbarService.adicionarLinks('Cadastrar turmas', 'cadastroturma');
    if (this.usuario?.permissao == 1) {
      this.appbarService.adicionarLinks('Cadastrar livros', 'cadastrolivro');
      this.appbarService.adicionarLinks('Cadastrar alunos', 'cadastroaluno');
    }
  }

  selecionarTurma(id: string) { 
    let turma = this.listaTurmas.find(value => value.id == id);
    this.router.navigateByUrl('/listaclassificacao/'+turma!.id);
  }
  obterTurmasUsuario() {
    return this.listaTurmas;
  }
}
