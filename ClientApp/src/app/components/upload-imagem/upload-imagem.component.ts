import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload-imagem',
  templateUrl: './upload-imagem.component.html',
  styleUrls: ['./upload-imagem.component.css']
})
export class UploadImagemComponent implements OnInit {
  
  @Output() img = new EventEmitter<any>();
  
  tamanhoInvalido: boolean = false;
  formatoInvalido: boolean = false;
  imagemAtual: any;
  constructor() { }

  ngOnInit(): void {
  }

  test:string = "";
  processarArquivo(arquivos: HTMLInputElement) {
    this.tamanhoInvalido = false;
    this.formatoInvalido = false;

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
      this.imagemAtual = reader.result;
    };
    
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  ObterImagem() {
    if (this.imagemAtual == undefined)
      return "../../../assets/images/default_capa.png"
    return this.imagemAtual;
  }
}
