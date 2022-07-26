import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TurmaListaComponent } from './turma-lista.component';


describe('TurmaListaComponent', () => {
  let component: TurmaListaComponent;
  let fixture: ComponentFixture<TurmaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurmaListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
