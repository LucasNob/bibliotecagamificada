import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroQuizComponent } from './cadastro-quiz.component';

describe('CadastroQuizComponent', () => {
  let component: CadastroQuizComponent;
  let fixture: ComponentFixture<CadastroQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
