import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
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
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UploadImagemComponent } from './components/upload-imagem/upload-imagem.component';
import { LivroService } from './services/livro.service';
import { PontoService } from './services/pontos.service';
import { TurmaService } from './services/turma.service';
import { UsuarioService } from './services/usuario.service';

//TODO: App routing module 
const appRoutes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'listaclassificacao', component: ClassificacaoPaginaComponent },
  { path: 'cadastrolivro', component: CadastroPaginaComponent },
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
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UsuarioService, TurmaService, PontoService, LivroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
