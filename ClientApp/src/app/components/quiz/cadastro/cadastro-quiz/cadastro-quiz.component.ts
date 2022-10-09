import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from 'src/app/models/entidades/Livro.model';
import { Quiz } from 'src/app/models/entidades/Quiz.model';
import { QuizCadastroModel } from 'src/app/models/entidades/QuizCadastro.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { LivroService } from 'src/app/services/livro.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-cadastro-quiz',
  templateUrl: './cadastro-quiz.component.html',
  styleUrls: ['./cadastro-quiz.component.css']
})
export class CadastroQuizComponent implements OnInit {
  formCadastro!: FormGroup;
  edicao: string = "";
  listaQuizzes: Array<Quiz> = [];
  livro?: Livro;
  estado: boolean = false;
  usuario:any;
  constructor(private quizService: QuizService,
    private formBuilder: FormBuilder, 
    private livroService: LivroService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef, 
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.usuario = authService.obterDadosUsuario();
  }

  ngOnInit(): void {
    let url = this.activatedRoute.snapshot.url.join().split(',');
    if (url[1]) {
      this.livroService.obterLivroPorId(url[1]).then(res => {
        this.livro = res as Livro;
        this.obterLista();
      })
      this.criarForm(new Quiz());
    }
    else
      this.router.navigateByUrl('#');
  }

  obterLista() {
    this.quizService.obterQuizPorIdLivro(this.livro!.id).then(data => {
      console.log(data)
      if (data)
        this.listaQuizzes = data as Array<Quiz>;
      else
        this.listaQuizzes = [];
  });
  }

  criarForm(quiz: Quiz) {
    while (quiz.alternativas.length < 4) {
      quiz.alternativas.push('');
    }
    this.formCadastro = this.formBuilder.group(
      {
        resposta: [quiz.resposta],
        alternativaA: [quiz.alternativas[0]],
        alternativaB: [quiz.alternativas[1]],
        alternativaC: [quiz.alternativas[2]],
        alternativaD: [quiz.alternativas[3]],
        livro: [quiz.livro],
        pergunta: [quiz.pergunta],
        instituicao: [quiz.instituicao]
      }
    );
    this.cdRef.detectChanges();
  }

  formInvalido(nome: any) {
    if (nome == "" || nome == undefined)
      return true;
    if (this.formCadastro != undefined)
      if (this.formCadastro.get(nome)!.value == "" || this.formCadastro.get(nome)!.value == undefined)
        return true;
    return false;
  }

  cadastrarQuiz() {
    this.formCadastro.get('pergunta')!.setValue(this.formCadastro.get('pergunta')?.value.trim());
    this.formCadastro.get('alternativaA')!.setValue(this.formCadastro.get('alternativaA')?.value.trim());
    this.formCadastro.get('alternativaB')!.setValue(this.formCadastro.get('alternativaB')?.value.trim());
    this.formCadastro.get('alternativaC')!.setValue(this.formCadastro.get('alternativaC')?.value.trim());
    this.formCadastro.get('alternativaD')!.setValue(this.formCadastro.get('alternativaD')?.value.trim());
    
      if (this.formCadastro.valid && this.estado == false)
      {
        this.estado = true;
        let quiz = this.obterObjeto();
        this.quizService.cadastrarQuiz(quiz).then(() => {
          this.obterLista();
          this.limparCampos();
        }
        ).finally(() => {
          this.estado = false;
        });
      }
  }

  excluirquiz(id:string) {
    this.quizService.excluirQuiz(id).then(data => {
      this.obterLista();
    });
  }

  excluirQuiz(id: string) {
    this.quizService.excluirQuiz(id).finally(() => {
      this.obterLista();
      this.cdRef.detectChanges();
    });
  }

  limparCampos() {
    this.criarForm(new Quiz());
    this.edicao = "";
    this.cdRef.detectChanges();
  }
  

  salvar() {
    this.formCadastro.get('pergunta')!.setValue(this.formCadastro.get('pergunta')?.value.trim());
    this.formCadastro.get('alternativaA')!.setValue(this.formCadastro.get('alternativaA')?.value.trim());
    this.formCadastro.get('alternativaB')!.setValue(this.formCadastro.get('alternativaB')?.value.trim());
    this.formCadastro.get('alternativaC')!.setValue(this.formCadastro.get('alternativaC')?.value.trim());
    this.formCadastro.get('alternativaD')!.setValue(this.formCadastro.get('alternativaD')?.value.trim());
    if (this.formCadastro.valid && this.estado == false)
    {
      this.estado = true;
      let quiz = this.obterObjeto();
      this.quizService.editarQuiz(quiz).then(() => {
        this.obterLista()
        this.limparCampos()
        }
      ).finally(() => { 
        this.estado = false;
      });
      this.edicao = "";
    }
  }
  obterObjeto() {
    const alternativas = [
      this.formCadastro.get('alternativaA')?.value,
      this.formCadastro.get('alternativaB')?.value,
      this.formCadastro.get('alternativaC')?.value,
      this.formCadastro.get('alternativaD')?.value]
    let quiz = new QuizCadastroModel()
    quiz.instituicao = this.usuario?.permissao == 1 ? this.usuario.id : this.usuario?.instituicao!;
    quiz.livro = this.livro?.id!;
    quiz.pergunta = this.formCadastro.get('pergunta')!.value;
    quiz.resposta = this.formCadastro.get('resposta')!.value
    quiz.alternativas = alternativas;
    if (this.edicao != "")
      quiz.id = this.edicao;
    
    return quiz;
  }

  editarQuiz(id: string) {
    let quiz = this.listaQuizzes.find(m => m.id == id);
    this.formCadastro.get('alternativaA')!.setValue(quiz?.alternativas[0]);
    this.formCadastro.get('alternativaB')!.setValue(quiz?.alternativas[1]);
    this.formCadastro.get('alternativaC')!.setValue(quiz?.alternativas[2]);
    this.formCadastro.get('alternativaD')!.setValue(quiz?.alternativas[3]);
    this.formCadastro.get('pergunta')!.setValue(quiz?.pergunta);
    this.formCadastro.get('resposta')!.setValue(quiz?.resposta);
    this.formCadastro.get('livro')!.setValue(quiz?.livro);
    this.formCadastro.get('instituicao')!.setValue(quiz?.instituicao);
    
    this.edicao = id;
  }

  modoEdicao() {
    if (this.edicao != "") {
      return true;
    }
    else return false;
  }

  estadoBotao() {
  console.log(this.formCadastro.get('resposta')!.value)
  console.log(this.formCadastro.get('alternativaA')!.value)
  console.log(this.formCadastro.get('alternativaB')!.value)
  console.log(this.formCadastro.get('alternativaC')!.value)
  console.log(this.formCadastro.get('alternativaD')!.value)
  console.log(this.formCadastro.get('pergunta')!.value )
    if (
    !this.formCadastro.get('resposta')!.value ||
    !this.formCadastro.get('alternativaA')!.value ||
    !this.formCadastro.get('alternativaB')!.value ||
    !this.formCadastro.get('alternativaC')!.value ||
    !this.formCadastro.get('alternativaD')!.value ||
    !this.formCadastro.get('pergunta')!.value ||
    !(this.listaQuizzes.length < 4 || this.modoEdicao()))
      return false;
    return this.formCadastro.valid;
  }

  obterNome() {
    return this.livro?.titulo
  }
}
