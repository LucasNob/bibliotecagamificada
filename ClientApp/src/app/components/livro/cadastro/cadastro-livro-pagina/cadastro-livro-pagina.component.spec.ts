import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroLivroPaginaComponent } from './cadastro-livro-pagina.component';

describe('CadastroLivroPaginaComponent', () => {
  let component: CadastroLivroPaginaComponent;
  let fixture: ComponentFixture<CadastroLivroPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroLivroPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroLivroPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
