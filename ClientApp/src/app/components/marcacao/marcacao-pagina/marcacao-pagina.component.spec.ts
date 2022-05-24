import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcacaoPaginaComponent } from './marcacao-pagina.component';

describe('MarcacaoPaginaaComponent', () => {
  let component: MarcacaoPaginaComponent;
  let fixture: ComponentFixture<MarcacaoPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcacaoPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcacaoPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
