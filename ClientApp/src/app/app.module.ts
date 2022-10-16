import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AlunoListaComponent } from './components/aluno/cadastro-aluno/aluno-lista/aluno-lista.component';
import { CadastroAlunoPaginaComponent } from './components/aluno/cadastro-aluno/cadastro-aluno-pagina/cadastro-aluno-pagina.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { ClassificacaoGlobalPaginaComponent } from './components/classificacao/classificacao-global-pagina/classificacao-global-pagina.component';
import { ClassificacaoListaItemComponent } from './components/classificacao/classificacao-lista-item/classificacao-lista-item.component';
import { ClassificacaoListaComponent } from './components/classificacao/classificacao-lista/classificacao-lista.component';
import { ClassificacaoPaginaComponent } from './components/classificacao/classificacao-pagina/classificacao-pagina.component';
import { HomeComponent } from './components/home/home/home.component';
import { CadastroLivroPaginaComponent } from './components/livro/cadastro/cadastro-livro-pagina/cadastro-livro-pagina.component';
import { LivroListaItemComponent } from './components/livro/cadastro/livro-lista-item/livro-lista-item.component';
import { LivroListaComponent } from './components/livro/cadastro/livro-lista/livro-lista.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { CadastroUsuarioPaginaComponent } from './components/login/cadastro-usuario-pagina/cadastro-usuario-pagina.component';
import { LoginPaginaComponent } from './components/login/login-pagina/login-pagina.component';
import { VerificarEmailPaginaComponent } from './components/login/verificar-email-pagina/verificar-email-pagina.component';
import { MarcacaoAlunoListaComponent } from './components/marcacao/marcacao-aluno-lista/marcacao-aluno-lista.component';
import { MarcacaoLivroPaginaComponent } from './components/marcacao/marcacao-livro-pagina/marcacao-livro-pagina.component';
import { MarcacaoPaginaComponent } from './components/marcacao/marcacao-pagina/marcacao-pagina.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PerfilUsuarioPaginaComponent } from './components/perfil/perfil-usuario-pagina/perfil-usuario-pagina.component';
import { CadastroProfessorPaginaComponent } from './components/professor/cadastro-professor/cadastro-professor-pagina/cadastro-professor-pagina.component';
import { ProfessorListaComponent } from './components/professor/cadastro-professor/professor-lista/professor-lista.component';
import { CadastroQuizComponent } from './components/quiz/cadastro/cadastro-quiz/cadastro-quiz.component';
import { QuizListaComponent } from './components/quiz/cadastro/quiz-lista/quiz-lista.component';
import { RespostaQuizComponent } from './components/quiz/resposta-quiz/resposta-quiz.component';
import { TurmaLivroslidosComponent } from './components/quiz/turma-livros-lidos/turma-livros-lidos.component';
import { CadastroTurmaAlunoPaginaComponent } from './components/turma/cadastro-turma-aluno/cadastro-turma-aluno-pagina/cadastro-turma-aluno-pagina.component';
import { CadastroTurmaLivroPaginaComponent } from './components/turma/cadastro-turma-livro/cadastro-turma-livro-pagina/cadastro-turma-livro-pagina.component';
import { CadastroTurmaPaginaComponent } from './components/turma/cadastro-turma/cadastro-turma-pagina/cadastro-turma-pagina.component';
import { TurmaListaComponent } from './components/turma/cadastro-turma/turma-lista/turma-lista.component';
import { SelecaoTurmaPaginaComponent } from './components/turma/selecao-turma/selecao-turma-pagina.component';
import { TurmaLivrosComponent } from './components/turma/turma-livros/turma-livros.component';
import { UploadImagemComponent } from './components/upload-imagem/upload-imagem.component';
import { AlunoService } from './services/aluno.service';
import { AuthService } from './services/auth.service';
import { InstituicaoService } from './services/instituicao.service';
import { LivroService } from './services/livro.service';
import { PontoService } from './services/pontos.service';
import { ProfessorService } from './services/professor.service';
import { TurmaService } from './services/turma.service';
import { UsuarioService } from './services/usuario.service';
import { AuthGuard } from './shared/guard/auth.guard';
import { MaterialModule } from './shared/modules/material/material.module';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'listaclassificacao/:id', component: ClassificacaoPaginaComponent, canActivate: [AuthGuard] },
  { path: 'classificacaoglobal', component: ClassificacaoGlobalPaginaComponent, canActivate: [AuthGuard] },
  { path: 'cadastroturma', component: CadastroTurmaPaginaComponent, canActivate: [AuthGuard] },
  { path: 'cadastroturmaaluno/:id', component: CadastroTurmaAlunoPaginaComponent, canActivate: [AuthGuard] },
  { path: 'cadastroturmalivro/:id', component: CadastroTurmaLivroPaginaComponent, canActivate: [AuthGuard] },
  { path: 'cadastrolivro', component: CadastroLivroPaginaComponent, canActivate: [AuthGuard] },
  { path: 'cadastroquiz/:id', component: CadastroQuizComponent, canActivate: [AuthGuard] },
  { path: 'respostaquiz', component: RespostaQuizComponent, canActivate: [AuthGuard] },
  { path: 'cadastroaluno', component: CadastroAlunoPaginaComponent, canActivate: [AuthGuard] },
  { path: 'cadastroprofessor', component: CadastroProfessorPaginaComponent, canActivate: [AuthGuard] },
  { path: 'perfilusuario', component: PerfilUsuarioPaginaComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPaginaComponent },
  { path: 'cadastrousuario', component: CadastroUsuarioPaginaComponent },
  { path: 'verificar-email', component: VerificarEmailPaginaComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ClassificacaoListaComponent,
    ClassificacaoListaItemComponent,
    AppBarComponent,
    NotFoundComponent,
    HomeComponent,
    ClassificacaoPaginaComponent,
    ClassificacaoGlobalPaginaComponent,
    AppBarComponent,
    ClassificacaoListaComponent,
    ClassificacaoListaItemComponent,
    LivroListaComponent,
    LivroListaItemComponent,
    UploadImagemComponent,
    MarcacaoPaginaComponent,
    MarcacaoLivroPaginaComponent,
    MarcacaoAlunoListaComponent,
    SelecaoTurmaPaginaComponent,
    LoadingOverlayComponent,
    CadastroTurmaPaginaComponent,
    CadastroLivroPaginaComponent,
    AlunoListaComponent,
    CadastroAlunoPaginaComponent,
    TurmaListaComponent,
    CadastroTurmaLivroPaginaComponent,
    CadastroTurmaAlunoPaginaComponent,
    TurmaLivrosComponent,
    LoginPaginaComponent,
    VerificarEmailPaginaComponent,
    CadastroProfessorPaginaComponent,
    ProfessorListaComponent,
    CadastroUsuarioPaginaComponent,
    PerfilUsuarioPaginaComponent,
    CadastroQuizComponent,
    QuizListaComponent,
    TurmaLivroslidosComponent,
    RespostaQuizComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [UsuarioService, TurmaService, PontoService, LivroService, AlunoService, ProfessorService, InstituicaoService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }