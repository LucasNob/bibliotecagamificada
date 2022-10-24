import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificacaoEscolarPaginaComponent } from './classificacao-escolar-pagina.component';

describe('ClassificacaoEscolarPaginaComponent', () => {
  let component: ClassificacaoEscolarPaginaComponent;
  let fixture: ComponentFixture<ClassificacaoEscolarPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificacaoEscolarPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificacaoEscolarPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
