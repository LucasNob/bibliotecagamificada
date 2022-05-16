import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcacaoLivroPaginaComponent } from './marcacao-livro-pagina.component';

describe('MarcacaoLivroPaginaComponent', () => {
  let component: MarcacaoLivroPaginaComponent;
  let fixture: ComponentFixture<MarcacaoLivroPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcacaoLivroPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcacaoLivroPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
