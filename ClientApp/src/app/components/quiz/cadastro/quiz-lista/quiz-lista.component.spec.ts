import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListaComponent } from './quiz-lista.component';

describe('QuizListaComponent', () => {
  let component: QuizListaComponent;
  let fixture: ComponentFixture<QuizListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
