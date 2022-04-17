import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClassificacaoListaItemComponent } from './components/classificacao/classificacao-lista-item/classificacao-lista-item.component';
import { ClassificacaoListaComponent } from './components/classificacao/classificacao-lista/classificacao-lista.component';
import { ClassificacaoPaginaComponent } from './components/classificacao/classificacao-pagina/classificacao-pagina.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { HomeComponent } from './components/home/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

//TODO: App routing module 
const appRoutes: Routes = [
  {
    path: '', component: HomeComponent, children: [  
      {path: 'listaclassificacao/:id', component: ClassificacaoPaginaComponent },
  ] },

  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found', pathMatch:'full'} 
  // {path:'ranking',component:cl}]}
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
    ClassificacaoPaginaComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
