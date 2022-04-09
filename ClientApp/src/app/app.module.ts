import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClassificacaoListaItemComponent } from './components/classificacao/classificacao-lista-item/classificacao-lista-item.component';
import { ClassificacaoListaComponent } from './components/classificacao/classificacao-lista/classificacao-lista.component';
import { AppBarComponent } from './components/home/app-bar/app-bar.component';
import { HomeComponent } from './components/home/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

//TODO: Rever implementação de rotas no projeto
const appRoutes: Routes = [
  { path: '', component: HomeComponent, children: [] },
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
    NotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
