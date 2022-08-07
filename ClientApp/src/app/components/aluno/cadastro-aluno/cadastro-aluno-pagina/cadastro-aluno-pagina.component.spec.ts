import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroAlunoPaginaComponent } from './cadastro-aluno-pagina.component';

describe('CadastroAlunoPaginaComponent', () => {
  let component: CadastroAlunoPaginaComponent;
  let fixture: ComponentFixture<CadastroAlunoPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroAlunoPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAlunoPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
