import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Quiz } from 'src/app/models/entidades/Quiz.model';

@Component({
  selector: 'app-cadastro-quiz',
  templateUrl: './cadastro-quiz.component.html',
  styleUrls: ['./cadastro-quiz.component.css']
})
export class CadastroQuizComponent implements OnInit {
  formCadastro!: FormGroup;
  edicao: string = "";
  constructor(private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  //livro e instituição são ids presentes na Model Livro
  criarForm(quiz: Quiz) {
    this.formCadastro = this.formBuilder.group(
      {
        pergunta: [quiz.pergunta],
        alternativaA: [quiz.alternativa1],
        alternativaB: [quiz.alternativa2],
        alternativaC: [quiz.alternativa3],
        alternativaD: [quiz.alternativa4],
        resposta: [quiz.resposta],
        livro: [quiz.livro],
        instituicao: [quiz.instituicao]
      }
    );
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

  }


  salvar() {
  }

  limparCampos() {
    this.criarForm(new Quiz());
    this.edicao = "";
    this.cdRef.detectChanges();
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

  obterNome() {
    return "Nome do Livro"
  }
}
