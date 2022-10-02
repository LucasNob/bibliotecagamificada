import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmaLivroslidosComponent } from './turma-livroslidos.component';

describe('TurmaLivroslidosComponent', () => {
  let component: TurmaLivroslidosComponent;
  let fixture: ComponentFixture<TurmaLivroslidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurmaLivroslidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmaLivroslidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
