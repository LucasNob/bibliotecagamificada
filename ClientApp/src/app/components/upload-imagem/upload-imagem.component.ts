import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload-imagem',
  templateUrl: './upload-imagem.component.html',
  styleUrls: ['./upload-imagem.component.css']
})
export class UploadImagemComponent implements OnInit,OnChanges {
  
  @Output() img = new EventEmitter<any>();
  
  tamanhoInvalido: boolean = false;
  formatoInvalido: boolean = false;
  imagemNaoEncontrada: boolean = false;

  @Input()
  imagemAtual?: String;
  
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
  }

  test:string = "";
  processarArquivo(arquivos: HTMLInputElement) {
    this.tamanhoInvalido = false;
    this.formatoInvalido = false;
    this.imagemNaoEncontrada = false;

    let arquivo = arquivos.files?.item(0);
    let reader = new FileReader();
    
    if (arquivo?.size! > 1000000) { //1mb
      this.tamanhoInvalido = true;
    }

    if (arquivo?.type != "image/png" && arquivo?.type != "image/jpeg" && arquivo?.type != "image/gif") { 
      this.formatoInvalido = true;
    }
    
    if (this.tamanhoInvalido || this.formatoInvalido) {
      return;
    }

    reader.readAsDataURL(arquivo!);

    reader.onload = () => {
      this.img.emit(reader.result);
      this.imagemAtual = reader.result as String;
    };
    
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  ObterImagem() {
    this.tamanhoInvalido  = false;
    this.formatoInvalido = false;
    this.imagemNaoEncontrada = false;
    if (this.imagemAtual == undefined || this.imagemAtual == "")
      return "../../../assets/images/default_capa.png";
    return this.imagemAtual;
  }
  erroCarregar() { 
    this.imagemNaoEncontrada = true;
  }

  // carregarPorUrl(url: string) {
  //   var xhr = new XMLHttpRequest();
  //   let imagem: any;
  //   xhr.onload = function () {
  //     var reader = new FileReader();
  //     reader.onloadend = function () {
  //       // callback(reader.result);
  //       imagem = reader.result;
  //     }
  //     reader.readAsDataURL(xhr.response);
  //   };
  //   xhr.open('GET', url);
  //   xhr.responseType = 'blob';
  //   xhr.send();

  // }
}
