import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/entidades/Usuario.model';


@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {

  constructor() { }

  @Input()
  usuario!: Usuario;

  ngOnInit(): void {
  
  }

}
