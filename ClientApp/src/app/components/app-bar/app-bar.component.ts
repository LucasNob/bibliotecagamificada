import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { AppBarService } from './app-bar.service.';


@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit,OnDestroy {

  constructor(
    private appBarService: AppBarService,
    private authService: AuthService) { }

  @Input()
  usuario!: Usuario;

  links: any;
  subscription: any;

  ngOnInit(): void {
    this.subscription = this.appBarService.itensChange.subscribe(res => {
      this.links = res;
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  usuarioLogado() {
    return this.authService.usuarioLogado();
  }
  obterLinks() {
    if (this.links)
      return this.links;
    else
      return [];
  }
  logout() {
    this.appBarService.limparLinks();
    this.authService.SignOut();
  }
}
