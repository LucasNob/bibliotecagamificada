import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { ClassificacaoListaItemComponent } from './components/classificacao/classificacao-lista-item/classificacao-lista-item.component';
import { ClassificacaoListaComponent } from './components/classificacao/classificacao-lista/classificacao-lista.component';
import { ClassificacaoPaginaComponent } from './components/classificacao/classificacao-pagina/classificacao-pagina.component';
import { HomeComponent } from './components/home/home/home.component';
import { CadastroPaginaComponent } from './components/livro/cadastro/cadastro-pagina/cadastro-pagina.component';
import { LivroListaItemComponent } from './components/livro/cadastro/livro-lista-item/livro-lista-item.component';
import { LivroListaComponent } from './components/livro/cadastro/livro-lista/livro-lista.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { MarcacaoAlunoListaComponent } from './components/marcacao/marcacao-aluno-lista/marcacao-aluno-lista.component';
import { MarcacaoLivroPaginaComponent } from './components/marcacao/marcacao-livro-pagina/marcacao-livro-pagina.component';
import { MarcacaoPaginaComponent } from './components/marcacao/marcacao-pagina/marcacao-pagina.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SelecaoTurmaPaginaComponent } from './components/turma/selecao-turma/selecao-turma-pagina.component';
import { UploadImagemComponent } from './components/upload-imagem/upload-imagem.component';
import { AlunoService } from './services/aluno.service';
import { LivroService } from './services/livro.service';
import { PontoService } from './services/pontos.service';
import { TurmaService } from './services/turma.service';
import { UsuarioService } from './services/usuario.service';
import { MaterialModule } from './shared/modules/material/material.module';

//TODO: App routing module 
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'listaclassificacao/:id', component: ClassificacaoPaginaComponent },
  { path: 'selecaoturma', component: SelecaoTurmaPaginaComponent },
  { path: 'cadastrolivro', component: CadastroPaginaComponent },
  { path: 'marcacao/:id', component: MarcacaoPaginaComponent },
  { path: 'marcacaoLivro', component: MarcacaoLivroPaginaComponent},
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
    AppBarComponent,
    ClassificacaoListaComponent,
    ClassificacaoListaItemComponent,
    LivroListaComponent,
    LivroListaItemComponent,
    UploadImagemComponent,
    CadastroPaginaComponent,
    MarcacaoPaginaComponent,
    MarcacaoLivroPaginaComponent,
    MarcacaoAlunoListaComponent,
    SelecaoTurmaPaginaComponent,
    LoadingOverlayComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [UsuarioService, TurmaService, PontoService, LivroService,AlunoService],
  bootstrap: [AppComponent]
})
export class AppModule { }