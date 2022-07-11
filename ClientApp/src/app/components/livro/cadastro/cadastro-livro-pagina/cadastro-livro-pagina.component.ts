import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Livro } from 'src/app/models/entidades/Livro.model';
import { LivroCadastroModel } from 'src/app/models/entidades/LivroCadastro.model';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { Genero } from 'src/app/models/livro/Genero.model';
import { OGenero } from 'src/app/models/livro/OGenero.model';
import { LivroService } from 'src/app/services/livro.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro-livro-pagina',
  templateUrl: './cadastro-livro-pagina.component.html',
  styleUrls: ['./cadastro-livro-pagina.component.css']
})
export class CadastroLivroPaginaComponent implements OnInit {

  formCadastro!: FormGroup;
  usuario?: Usuario;
  listaLivros: Array<Livro> = [];
  edicao: String = "";
  imgCarregada?: any;
  imagemAtual?: String ="";
  estado: boolean = false;

  constructor(private livroService: LivroService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
  ) { 
      this.usuarioService.usuario =  new Usuario("idinstituicao1", "Anglo Sorocaba",1,
      "https://pbs.twimg.com/profile_images/570291758630576128/x3lqZT5Z_400x400.png");
    
      this.usuario = usuarioService.obterUsuario(); 
    }
    
    ngOnInit(): void { 
      this.obterListaLivros();
      this.criarForm(new Livro());
  }
  obterListaLivros() {
    this.livroService.obterLivrosPorIdInstituicao(this.usuario?.id!).then(data => {
      this.listaLivros = data as Array<Livro>;
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
      this.formCadastro.get('titulo')!.setValue(this.formCadastro.get('titulo')?.value.trim());
      this.formCadastro.get('autor')!.setValue(this.formCadastro.get('autor')?.value.trim());
      if (this.formCadastro.valid && this.estado == false)
      {
      this.estado = true;
      let livro = this.obterObjetoLivro();
      this.livroService.cadastrarLivro(livro).then(() => {
        this.obterListaLivros();
        this.limparCampos();
      }
      ).finally(() => {
        this.estado = false;
      });
    }
  }

  obterObjetoLivro() {
    let num = OGenero.ObterNumero(this.formCadastro.get('genero')!.value);
    let genero = Genero[num];
    let livro = new LivroCadastroModel(
      this.formCadastro.get('titulo')!.value,
      this.formCadastro.get('autor')!.value,
      num,
      this.usuario?.id!,
      this.imgCarregada
    );
    if (this.edicao != "")
      livro.id = this.edicao;
    
    return livro;
  }

  editarLivro(id: String) {
    let livro = this.listaLivros.find(m => m.id == id);
    let genero = OGenero.ObterNome(livro?.genero!);

    this.formCadastro.get('titulo')!.setValue(livro?.titulo);
    this.formCadastro.get('autor')!.setValue(livro?.autor);
    this.formCadastro.get('genero')!.setValue(genero != undefined ? genero : Genero.SemGenero);
    this.formCadastro.get('capa')!.setValue(livro?.capa);

    this.imagemAtual = livro?.capa!;
    this.imgCarregada = livro?.capa!;
    this.edicao = id;
  }

  excluirLivro(id:String) {
    this.livroService.excluirLivro(id).then(data => {
      this.obterListaLivros();
    });
  }

  limparCampos() { 
    this.criarForm(new Livro());
    this.imagemAtual = undefined;
    this.imgCarregada = "../../../assets/images/default_capa.png";
    this.edicao = "";
  }

  salvarLivro() {
    this.formCadastro.get('titulo')!.setValue(this.formCadastro.get('titulo')?.value.trim());
    this.formCadastro.get('autor')!.setValue(this.formCadastro.get('autor')?.value.trim());
    if (this.formCadastro.valid && this.estado == false)
    {
      this.estado = true;
      let livro = this.obterObjetoLivro();
      this.livroService.editarLivro(livro).then(() => {
        this.obterListaLivros()
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
  ObterNomeGenero(genero: any) { 
    return OGenero.ObterNome(+Genero[genero]);
  }
}

