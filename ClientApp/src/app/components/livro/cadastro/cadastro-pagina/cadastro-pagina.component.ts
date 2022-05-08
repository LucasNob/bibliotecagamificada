import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Livro } from 'src/app/models/entidades/Livro.model';
import { LivroCadastroModel } from 'src/app/models/entidades/LivroCadastro.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { Genero } from 'src/app/models/livro/Genero.model';
import { LivroService } from 'src/app/services/livro.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LivroListaComponent } from '../livro-lista/livro-lista.component';

@Component({
  selector: 'app-cadastro-pagina',
  templateUrl: './cadastro-pagina.component.html',
  styleUrls: ['./cadastro-pagina.component.css']
})
export class CadastroPaginaComponent implements OnInit {

  formCadastro!: FormGroup;
  imgCarregada?: string;
  usuario?: Usuario;
  listaLivros: Array<Livro> = [];
  edicao: String = "";

  constructor(private livroService: LivroService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder){ 
      this.usuarioService.usuario = new Usuario("idinstituicao1", "Instituicao1");
    
      this.usuario = usuarioService.obterUsuario(); 

    }
    
    ngOnInit(): void { 
      this.obterListaLivros();
      this.criarForm(new Livro());
  }
  obterListaLivros() {
    let listaLivros: Array<Livro> = [];
    this.livroService.obterLivrosPorIdInstituicao(this.usuario?.id!).then(data => {
      this.listaLivros = data as Array<Livro>;
      console.log(listaLivros);
    });
  }
  
  criarForm(livro: Livro) {
    this.formCadastro = this.formBuilder.group(
      {
        titulo: [livro.titulo],
        genero: [livro.genero],
        autor: [livro.autor],
        capa: [livro.capa]
      }
    );
  }
  listaGeneros() {
    const generos = Object.keys(Genero).filter((v) => isNaN(Number(v)));
    return generos;
  }

  cadastrarLivro(v: any) {
    let livro = this.obterObjetoLivro();
    console.log(livro)
    this.livroService.cadastrarLivro(livro).then(() =>
      this.obterListaLivros()
    );
  }

  obterObjetoLivro() {
    // let genero:Genero = this.formCadastro.get('genero')!.value;
    let genero = Genero[this.formCadastro.get('genero')!.value];
    let livro = new LivroCadastroModel(
      this.formCadastro.get('titulo')!.value,
      this.formCadastro.get('autor')!.value,
      +genero,
      this.usuario?.id!,
      this.imgCarregada
    );
    if (this.edicao != "")
      livro.id = this.edicao;
    
    return livro;
  }

  editarLivro(id: String) {
    let livro = this.listaLivros.find(m => m.id == id);
    this.formCadastro.get('titulo')!.setValue(livro?.titulo);
    this.formCadastro.get('autor')!.setValue(livro?.autor);
    this.formCadastro.get('genero')!.setValue(livro?.genero);
    this.formCadastro.get('capa')!.setValue(livro?.capa);
    this.edicao = id;
  }

  excluirLivro(id:String) {

    this.livroService.excluirLivro(id).then(data => {
      this.obterListaLivros();
    });
  }

  limparCampos() { 
    this.criarForm(new Livro());
  }

  salvarLivro() {
    let livro = this.obterObjetoLivro();
    this.livroService.editarLivro(livro);
    this.edicao = "";
  }

  modoEdicao() {
    if (this.edicao != "") {
      return true
    }
    else return false;
  }
}

