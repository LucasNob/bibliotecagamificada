import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from '@angular/core';
import { Quiz } from "../models/entidades/Quiz.model";
import { QuizCadastroModel } from "../models/entidades/QuizCadastro.model";
import { GetModelLista } from "../models/GetModelLista.model";
import { GetModelUnico } from "../models/GetModelUnico.model";
import { LoadingOverlayService } from "./loading-overlay.service";


@Injectable({
  providedIn: 'root',
})

export class QuizService {

    path = 'v1/quiz/';

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private loading: LoadingOverlayService) {
    }


    
    public obterQuizPorIdLivro(id: string) {
        this.loading.show();
        
        return new Promise(
            resolve => {
                this.http.get<GetModelLista<Quiz>>(this.baseUrl + this.path +'obterQuizzesPorLivro/' + id).subscribe(result => {
                    this.loading.hide();
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public obterQuizPorId(id: string) {
        this.loading.show();

        return new Promise(
            resolve => {
                this.http.get<GetModelUnico<Quiz>>(this.baseUrl + this.path +'obterQuiz/' + id).subscribe(result => {
                    this.loading.hide();
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
        
    public cadastrarQuiz(Quiz: QuizCadastroModel) {
        return new Promise(
            resolve => {
                this.http.post<any>(this.baseUrl + this.path +'cadastrarQuiz/', Quiz).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }

    public excluirQuiz(id: string){
        return new Promise(
            resolve => {
                this.http.delete<GetModelLista<Quiz>>(this.baseUrl + this.path + 'excluirQuiz/'+id).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
    public editarQuiz(Quiz: QuizCadastroModel) {
        return new Promise(
            resolve => {
                this.http.put<any>(this.baseUrl + this.path+ 'editarQuiz/', Quiz).subscribe(result => {
                    resolve(result.objeto);
                }, error => console.error(error));
            }
        )
    }
}