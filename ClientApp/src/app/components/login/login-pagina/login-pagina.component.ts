import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-pagina',
  templateUrl: './login-pagina.component.html',
  styleUrls: ['./login-pagina.component.css']
})
export class LoginPaginaComponent implements OnInit {
  form!: FormGroup;
  erro = '';
  @ViewChild('content')
  contentModal: any;

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.usuarioLogado())
      this.router.navigate(['/']);
    
    this.criarForm({senha :'',email: ''});
  }
  criarForm(login: any) {
    this.form = this.formBuilder.group(
      {
        senha: [login.senha],
        email: [login.email],
        emailRedenifinir: ['']
      }
    );
  }
  validarEmail() {
    if (this.form.get('email')) {
      const email = this.form.get('email')!.value;
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        return false;
    }
    return true;
  }
  validarEmailRedenifir() {
    if (this.form.get('emailRedenifinir')) {
      const email = this.form.get('emailRedenifinir')!.value;
      console.log(email)
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        return false;
    }
    return true;
  }
  validarSenha() {
    //TODO validar
    return false;
  }
  login() {
    const senha = this.form.get('senha');
    const email = this.form.get('email');
    if (senha) {
      if (email) {
        this.authService.signIn(email.value, senha.value).then(() => {
        });
      }
    }
  }
  estadoBotao() {
    const senha = this.form.get('senha');
    const email = this.form.get('email');
    if (!senha || !email || this.validarEmail())
      return false;
    return this.form.valid;
  }
  cadastrar() {
    //navegar tela cadastro
  }
  abrirRedefinirSenha() {
    
    const opcoes: NgbModalOptions = {
      // backdrop: 'static',
      // keyboard: false,
      // size: 'lg',
      windowClass: "custom-modal"
    };
    
    this.modalService.open(this.contentModal, opcoes)
  }
  redefinirSenha() {
    const email = this.form.get('emailRedenifinir')!.value;
    if (email){
      this.authService.redefinirSenha(email).then(res => {
        this.modalService.dismissAll();
      })
    }
  }
}
