import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroTurmaLivroPaginaComponent } from './cadastro-turma-livro-pagina.component';

describe('CadastroTurmaLivroPaginaComponent', () => {
  let component: CadastroTurmaLivroPaginaComponent;
  let fixture: ComponentFixture<CadastroTurmaLivroPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroTurmaLivroPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroTurmaLivroPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
