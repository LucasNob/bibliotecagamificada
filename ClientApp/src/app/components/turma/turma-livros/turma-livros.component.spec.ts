import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmaLivrosComponent } from './turma-livros.component';

describe('TurmaLivrosComponent', () => {
  let component: TurmaLivrosComponent;
  let fixture: ComponentFixture<TurmaLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurmaLivrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmaLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
