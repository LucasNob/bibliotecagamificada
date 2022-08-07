import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verificar-email-pagina',
  templateUrl: './verificar-email-pagina.component.html',
  styleUrls: ['./verificar-email-pagina.component.css']
})
export class VerificarEmailPaginaComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void { 
  }
}
