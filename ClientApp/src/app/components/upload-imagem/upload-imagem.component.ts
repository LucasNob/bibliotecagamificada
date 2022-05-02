import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload-imagem',
  templateUrl: './upload-imagem.component.html',
  styleUrls: ['./upload-imagem.component.css']
})
export class UploadImagemComponent implements OnInit {
  
  @Output() img = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  test:string = "";
  processarArquivo(arquivos: HTMLInputElement) {
      
    let arquivo = arquivos.files?.item(0);
    let reader = new FileReader();
    reader.readAsDataURL(arquivo!);
    
    reader.onload =() => {
      this.img.emit(reader.result);
    };
    
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}
