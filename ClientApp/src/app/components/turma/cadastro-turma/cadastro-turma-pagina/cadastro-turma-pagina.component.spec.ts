import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroTurmaPaginaComponent } from './cadastro-turma-pagina.component';

describe('CadastroTurmaPaginaComponent', () => {
  let component: CadastroTurmaPaginaComponent;
  let fixture: ComponentFixture<CadastroTurmaPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroTurmaPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroTurmaPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
