import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroProfessorPaginaComponent } from './cadastro-professor-pagina.component';

describe('CadastroProfessorPaginaComponent', () => {
  let component: CadastroProfessorPaginaComponent;
  let fixture: ComponentFixture<CadastroProfessorPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroProfessorPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroProfessorPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
