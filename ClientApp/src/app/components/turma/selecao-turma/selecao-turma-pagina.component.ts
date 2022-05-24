import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Turma } from 'src/app/models/entidades/Turma.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { AlunoService } from 'src/app/services/aluno.service';
import { TurmaService } from 'src/app/services/turma.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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
    private usuarioService: UsuarioService,
    private router: Router) {
    
    this.usuario = usuarioService.obterUsuario(); 
    
    if(this.usuario != undefined)
    {
      if (this.usuario.permissao==2)
      turmaService.obterTurmasPorIdProfessor(this.usuario!.id).then(data => {
        this.listaTurmas = data as Array<Turma>;
      });
      if (this.usuario.permissao == 3)
      turmaService.obterTurmasPorIdAluno(this.usuario!.id).then(data => {
        this.listaTurmas = data as Array<Turma>;
      });
    }
  }

  ngOnInit(): void {
  }

  selecionarTurma(id: String) { 
    let turma = this.listaTurmas.find(value => value.id == id);
    this.router.navigateByUrl('/listaclassificacao', { state: { Turma: turma} });
  }
  obterTurmasUsuario() {
    return this.listaTurmas;
  }
}
