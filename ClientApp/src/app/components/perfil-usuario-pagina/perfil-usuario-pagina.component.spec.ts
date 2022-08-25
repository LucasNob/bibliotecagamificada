import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsuarioPaginaComponent } from './perfil-usuario-pagina.component';

describe('PerfilUsuarioPaginaComponent', () => {
  let component: PerfilUsuarioPaginaComponent;
  let fixture: ComponentFixture<PerfilUsuarioPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilUsuarioPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUsuarioPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
