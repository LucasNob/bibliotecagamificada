import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Livro } from 'src/app/models/entidades/Livro.model';
import { LivroCadastroModel } from 'src/app/models/entidades/LivroCadastro.model';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-cadastro-pagina',
  templateUrl: './cadastro-pagina.component.html',
  styleUrls: ['./cadastro-pagina.component.css']
})
export class CadastroPaginaComponent implements OnInit {

  formCadastro!: FormGroup;

  constructor(private livroService: LivroService,private formBuilder: FormBuilder) { }

  ngOnInit(): void { 
    this.criarForm(new Livro());
  }
  criarForm(livro: Livro) {
    this.formCadastro = this.formBuilder.group(
      {
        titulo: [livro.titulo],
        genero: [livro.genero],
        autor: [livro.autor],
        capa: [livro.capa]
      }
    )
  }

  cadastrarLivro(v: any) {
    let livro = this.obterObjetoLivro();

    console.log(this.livroService.cadastrarLivro(livro));
  }

  obterObjetoLivro() {
    let livro = new LivroCadastroModel();
    livro.titulo = this.formCadastro.get('titulo')!.value;
    livro.autor = this.formCadastro.get('autor')!.value;
    livro.genero = this.formCadastro.get('genero')!.value;
    return livro;
  }
}
