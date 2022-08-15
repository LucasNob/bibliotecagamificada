import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlunoListaComponent } from './aluno-lista.component';


describe('TurmaListaComponent', () => {
  let component: AlunoListaComponent;
  let fixture: ComponentFixture<AlunoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunoListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
  