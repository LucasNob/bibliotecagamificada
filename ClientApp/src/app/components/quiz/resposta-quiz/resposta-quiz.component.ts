import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resposta-quiz',
  templateUrl: './resposta-quiz.component.html',
  styleUrls: ['./resposta-quiz.component.css']
})
export class RespostaQuizComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  estadoBotao() {
    return true;
  }

}
