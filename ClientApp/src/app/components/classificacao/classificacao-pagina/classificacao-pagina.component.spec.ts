import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificacaoPaginaComponent } from './classificacao-pagina.component';

describe('ClassificacaoListaComponent', () => {
  let component: ClassificacaoPaginaComponent;
  let fixture: ComponentFixture<ClassificacaoPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificacaoPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificacaoPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
