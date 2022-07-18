import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/entidades/Usuario.model';
import { AppBarService } from './app-bar.service.';


@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit,OnDestroy {

  constructor(
    private activatedRoute: ActivatedRoute,
    private appBarService:AppBarService) { }

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
    //prevent memory leak when component destroyed
     this.subscription.unsubscribe();
   }
  obterLinks() {
    if (this.links)
      return this.links;
    else
      return [];
  }

}
