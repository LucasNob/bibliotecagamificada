import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPaginaComponent } from './cadastro-pagina.component';

describe('CadastroPaginaComponent', () => {
  let component: CadastroPaginaComponent;
  let fixture: ComponentFixture<CadastroPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
