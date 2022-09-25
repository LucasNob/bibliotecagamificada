import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroUsuarioPaginaComponent } from './cadastro-usuario-pagina.component';

describe('CadastroUsuarioPaginaComponent', () => {
  let component: CadastroUsuarioPaginaComponent;
  let fixture: ComponentFixture<CadastroUsuarioPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroUsuarioPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroUsuarioPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
