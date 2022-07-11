import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroTurmaAlunoPaginaComponent } from './cadastro-turma-aluno-pagina.component';

describe('CadastroTurmaAlunoPaginaComponent', () => {
  let component: CadastroTurmaAlunoPaginaComponent;
  let fixture: ComponentFixture<CadastroTurmaAlunoPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroTurmaAlunoPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroTurmaAlunoPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
