import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcacaoAlunoListaComponent } from './marcacao-aluno-lista.component';

describe('MarcacaoAlunoListaComponent', () => {
  let component: MarcacaoAlunoListaComponent;
  let fixture: ComponentFixture<MarcacaoAlunoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcacaoAlunoListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcacaoAlunoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
