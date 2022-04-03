import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificacaoListaComponent } from './classificacao-lista.component';

describe('ClassificacaoListaComponent', () => {
  let component: ClassificacaoListaComponent;
  let fixture: ComponentFixture<ClassificacaoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificacaoListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificacaoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
