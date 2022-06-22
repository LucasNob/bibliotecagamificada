import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoTurmaPaginaComponent } from './selecao-turma-pagina.component';

describe('SelecaoTurmaComponent', () => {
  let component: SelecaoTurmaPaginaComponent;
  let fixture: ComponentFixture<SelecaoTurmaPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecaoTurmaPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoTurmaPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
