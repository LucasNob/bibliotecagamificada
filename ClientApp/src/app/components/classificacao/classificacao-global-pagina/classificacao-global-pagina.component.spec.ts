import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassificacaoGlobalPaginaComponent } from './classificacao-global-pagina.component';


describe('ClassificacaoListaComponent', () => {
  let component: ClassificacaoGlobalPaginaComponent;
  let fixture: ComponentFixture<ClassificacaoGlobalPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificacaoGlobalPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificacaoGlobalPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
