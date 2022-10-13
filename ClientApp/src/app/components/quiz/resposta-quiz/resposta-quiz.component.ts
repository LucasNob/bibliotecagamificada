import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { PontoAtualizacao } from 'src/app/models/classificacao/PontoAtualizacao.model';
import { Aluno } from 'src/app/models/entidades/Aluno.model';
import { Livro } from 'src/app/models/entidades/Livro.model';
import { Ponto } from 'src/app/models/entidades/Ponto.model';
import { Quiz } from 'src/app/models/entidades/Quiz.model';
import { Turma } from 'src/app/models/entidades/Turma.model';
import { PontoService } from 'src/app/services/pontos.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-resposta-quiz',
  templateUrl: './resposta-quiz.component.html',
  styleUrls: ['./resposta-quiz.component.css']
})
export class RespostaQuizComponent implements OnInit {

  ponto?: Ponto; 
  aluno?: Aluno;
  livro?: Livro;
  turma?: Turma;
  return: string = '/home';
  quizzes?: Array<Quiz>;
  respostas:Array<number> = [];

  constructor(private router: Router, private quizService: QuizService,private pontoService:PontoService, private cdRef: ChangeDetectorRef) { 
    const state = this.router.getCurrentNavigation()
    if (state?.extras &&
      state.extras.state) {
      this.ponto = state.extras.state.ponto;
      this.aluno = state.extras.state.aluno;
      this.livro = state.extras.state.livro;
      this.turma = state.extras.state.turma;
      this.return = state.extras.state.return;
    }
    else {
      history.back();
    }
  }

  ngOnInit(): void {
    if(this.ponto?.livrosQuiz.findIndex(e => e == this.livro!.id)!=-1){
      this.router.navigate(['/home']);
    };
    this.quizService.obterQuizPorIdLivro(this.livro!.id).then(res => {
      this.quizzes = res as Array<Quiz>;
      this.quizzes.forEach(q => {
        this.respostas.push(-1);
      })
      this.cdRef.detectChanges();
    })
  }

  estadoBotao() {
    if (this.respostas.find(e => e == -1) != null)
      return false;  
    return true;
  }

  selecionarResposta(pergunta: number, alternativa:number) {
    this.respostas[pergunta] = alternativa+1;
  }
  salvarRespostas() {
    let acertos = 0;
    let i = 0;
    for (i = 0; i < this.respostas.length; i++){
      if (this.respostas[i] == this.quizzes![i].resposta) {
        acertos+=.5;
      } 
    }
    let ponto = new PontoAtualizacao(this.aluno?.id!,this.turma?.id!,this.ponto?.livrosLidos!, acertos);
    ponto.totalPontos = acertos;
    ponto.idLivroQuiz = this.livro?.id;
    this.pontoService.atualizarPontuacaoQuiz(ponto).then(res => {
      this.router.navigate([this.return]);
    });
  }
}
